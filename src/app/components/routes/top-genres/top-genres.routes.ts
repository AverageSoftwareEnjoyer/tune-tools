import { Routes } from "@angular/router";
import { timeRangeGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopGenresComponent } from "./top-genres.component";

export default [
    {
        path: ":timeRange",
        component: TopGenresComponent,
        canActivate: [timeRangeGuard(TopItemsRoutes.TopGenres)],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
