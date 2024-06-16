import { Routes } from "@angular/router";
import { timeRangeGuard } from "@core/helpers";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

import { TopTracksComponent } from "./top-tracks.component";

export default [
    {
        path: ":timeRange",
        component: TopTracksComponent,
        canActivate: [timeRangeGuard(TopItemsRoutes.TopTracks)],
    },
    { path: "**", redirectTo: TimeRangeOptions.ShortTerm },
] as Routes;
