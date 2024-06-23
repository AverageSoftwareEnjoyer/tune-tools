import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@env/environment";
import { concatMap, map, takeWhile } from "rxjs";

import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";

/**
 * Intercepts HTTP requests to add an Authorization header if the request is to the API base URL.
 * It checks for the presence of an access token in local storage and clones the request to include
 * the token in the Authorization header. If the token is potentially expired, it attempts to renew
 * the token before proceeding with the request.
 *
 * @param req - The outgoing request object to handle.
 * @param next - The HTTP handler to which the transformed request is forwarded.
 * @returns An observable that resolves to the HTTP event stream.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);

    if (req.url.startsWith(environment.apiBaseUrl)) {
        const authService = inject(AuthService);
        return authService.handlePotentiallyExpiredAccessToken$().pipe(
            takeWhile((response) => response),
            map(() => localStorageService.getItem("access_token")),
            concatMap((token) =>
                next(
                    req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ),
            ),
        );
    }
    return next(req);
};
