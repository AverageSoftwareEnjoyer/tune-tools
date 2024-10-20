import { Routes } from "@angular/router";
import { routeParamGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopArtistsComponent } from "./top-artists.component";

export default [
    {
        path: ":timeRange",
        component: TopArtistsComponent,
        canActivate: [
            routeParamGuard(
                TopItemsRoutes.TopArtists,
                TimeRangeOptions,
                "timeRange",
                TimeRangeOptions.ShortTerm,
            ),
        ],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
