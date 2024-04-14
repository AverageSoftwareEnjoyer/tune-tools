import { Routes } from "@angular/router";

import { TopGenresComponent } from "./top-genres.component";

export default [
    { path: ":timeframe", component: TopGenresComponent },
    { path: "**", redirectTo: "4-weeks" },
] as Routes;
