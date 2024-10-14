import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { ErrorMessages } from "@model/requests-state.model";
import { LoadingStateService } from "@state/loading-state.service";
import {
    catchError,
    EMPTY,
    finalize,
    retry,
    timeout,
    TimeoutError,
    timer,
} from "rxjs";

import { ErrorsService } from "./errors.service";

/**
 * Intercepts HTTP requests and handles its loading state, as well as any potential errors,
 * arising from a specified timeout or an HTTP error response.
 *
 * @param req - The outgoing request object to handle.
 * @param next - The HTTP handler to which the transformed request is forwarded.
 * @returns An observable that resolves to the HTTP event stream.
 */
export const requestsInterceptor: HttpInterceptorFn = (req, next) => {
    const errorsService = inject(ErrorsService);
    const loadingStateService = inject(LoadingStateService);

    loadingStateService.publishLoadingState({
        isLoading: true,
        url: req.url,
    });

    return next(req).pipe(
        retry({
            count: 3,
            delay(error: HttpErrorResponse, retryCount) {
                if (error.status === 429) {
                    const retryAfter = Number(error.headers.get("retryAfter"));
                    if (retryAfter) {
                        return timer(retryAfter);
                    }
                }
                return timer(2 ** (retryCount - 1) * 100);
            },
        }),
        timeout(3000),
        catchError((error: HttpErrorResponse) => {
            errorsService.openErrorSnackbar(
                error instanceof TimeoutError
                    ? ErrorMessages.Timeout
                    : ErrorMessages.Default,
            );
            return EMPTY;
        }),
        finalize(() => {
            loadingStateService.publishLoadingState({
                isLoading: false,
                url: req.url,
            });
        }),
    );
};
