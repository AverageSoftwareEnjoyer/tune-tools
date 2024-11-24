import { Routes } from "@angular/router";
import { routeParamGuard } from "@core/helpers";
import { RECENTLY_PLAYED_ROUTES } from "@model/recently-played.model";

import { RecentlyPlayedComponent } from "./recently-played.component";

export default [
    {
        path: ":viewType",
        component: RecentlyPlayedComponent,
        canActivate: [
            routeParamGuard(
                "recently-played",
                RECENTLY_PLAYED_ROUTES,
                "viewType",
                RECENTLY_PLAYED_ROUTES.Default,
            ),
        ],
    },
    { path: "**", redirectTo: RECENTLY_PLAYED_ROUTES.Default },
] as Routes;
