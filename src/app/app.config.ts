import { provideHttpClient } from "@angular/common/http";
import {
    APP_INITIALIZER,
    ApplicationConfig,
    ErrorHandler,
} from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from "@angular/router";
import { LocalStorageService } from "@core/auth/local-storage.service";
import * as Sentry from "@sentry/angular-ivy";
import { AuthStateService } from "@state/auth.state.service";

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
        provideHttpClient(),
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
    ],
};
