import { Routes } from "@angular/router";

import { TopArtistsComponent } from "./top-artists.component";

export default [
    { path: ":timeframe", component: TopArtistsComponent },
    { path: "**", redirectTo: "4-weeks" },
] as Routes;
