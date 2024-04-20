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
import * as Sentry from "@sentry/angular-ivy";

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
    ],
};
