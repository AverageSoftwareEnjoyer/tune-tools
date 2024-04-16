import { Routes } from "@angular/router";

import { RecentlyPlayedComponent } from "./recently-played.component";

export default [
    { path: ":view-type", component: RecentlyPlayedComponent },
    { path: "**", redirectTo: "unsorted" },
] as Routes;
