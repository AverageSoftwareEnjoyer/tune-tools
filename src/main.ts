import { bootstrapApplication } from "@angular/platform-browser";
import * as Sentry from "@sentry/angular-ivy";

import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

Sentry.init({
    dsn: "https://4a402fb2665571681af69dde2aa3a064@o4506809213714432.ingest.us.sentry.io/4506809217449984",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: [
        "localhost",
        /^https:\/\/averagesoftwareenjoyer\.github\.io\/tune-tools/,
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});

bootstrapApplication(AppComponent, appConfig).catch((err) => {
    console.error(err);
});
