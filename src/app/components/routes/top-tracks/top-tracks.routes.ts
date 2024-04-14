import { Routes } from "@angular/router";

import { TopTracksComponent } from "./top-tracks.component";

export default [
    { path: ":timeframe", component: TopTracksComponent },
    { path: "**", redirectTo: "4-weeks" },
] as Routes;
