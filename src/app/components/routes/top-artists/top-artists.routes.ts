import { Routes } from "@angular/router";
import { timeRangeGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopArtistsComponent } from "./top-artists.component";

export default [
    {
        path: ":timeRange",
        component: TopArtistsComponent,
        canActivate: [timeRangeGuard(TopItemsRoutes.TopArtists)],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
