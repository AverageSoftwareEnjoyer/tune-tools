import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { environment } from "@env/environment";

import { LocalStorageService } from "./local-storage.service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const token = localStorageService.getItem("access_token");

    if (req.url.startsWith(environment.apiBaseUrl)) {
        const clonedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`,
            },
        });
        return next(clonedRequest);
    }
    return next(req);
};
