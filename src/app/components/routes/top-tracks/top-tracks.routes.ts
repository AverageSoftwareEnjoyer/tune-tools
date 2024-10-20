import { Routes } from "@angular/router";
import { routeParamGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopTracksComponent } from "./top-tracks.component";

export default [
    {
        path: ":timeRange",
        component: TopTracksComponent,
        canActivate: [
            routeParamGuard(
                TopItemsRoutes.TopTracks,
                TimeRangeOptions,
                "timeRange",
                TimeRangeOptions.ShortTerm,
            ),
        ],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
