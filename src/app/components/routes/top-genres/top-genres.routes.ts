import { Routes } from "@angular/router";
import { routeParamGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopGenresComponent } from "./top-genres.component";

export default [
    {
        path: ":timeRange",
        component: TopGenresComponent,
        canActivate: [
            routeParamGuard(
                TopItemsRoutes.TopGenres,
                TimeRangeOptions,
                "timeRange",
                TimeRangeOptions.ShortTerm,
            ),
        ],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
