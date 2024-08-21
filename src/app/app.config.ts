import { provideHttpClient, withInterceptors } from "@angular/common/http";
import {
    APP_INITIALIZER,
    ApplicationConfig,
    ErrorHandler,
} from "@angular/core";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from "@angular/router";
import { authInterceptor } from "@core/auth/auth.interceptor";
import { LocalStorageService } from "@core/auth/local-storage.service";
import { requestsInterceptor } from "@core/requests/requests.interceptor";
import * as Sentry from "@sentry/angular";
import { AuthStateService } from "@state/auth-state.service";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withComponentInputBinding(),
            withInMemoryScrolling({
                anchorScrolling: "enabled",
                scrollPositionRestoration: "enabled",
            }),
        ),
        provideHttpClient(
            withInterceptors([requestsInterceptor, authInterceptor]),
        ),
        provideAnimationsAsync(),
        {
            provide: ErrorHandler,
            useValue: Sentry.createErrorHandler({
                showDialog: false,
                logErrors: true,
            }),
        },
        {
            provide: APP_INITIALIZER,
            useFactory: () => () => ({}),
            deps: [Sentry.TraceService],
            multi: true,
        },
        {
            provide: APP_INITIALIZER,
            useFactory:
                (
                    localStorageService: LocalStorageService,
                    authStateService: AuthStateService,
                ) =>
                () => {
                    authStateService.isUserAuthenticated =
                        !!localStorageService.getItem("access_token");
                },
            deps: [LocalStorageService, AuthStateService],
            multi: true,
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 3000 },
        },
    ],
};
