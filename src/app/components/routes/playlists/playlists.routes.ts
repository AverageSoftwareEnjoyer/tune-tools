import { inject } from "@angular/core";
import { CanActivateFn, Router, Routes } from "@angular/router";

import { PlaylistsComponent } from "./playlists.component";

const playlistGuard: CanActivateFn = () =>
    // TODO: Update once workflows are introduced.
    inject(Router).parseUrl("/playlists");

export default [
    { path: "", component: PlaylistsComponent, pathMatch: "full" },
    {
        path: "workflows",
        component: PlaylistsComponent,
        canActivate: [playlistGuard],
    },
    { path: "**", redirectTo: "" },
] as Routes;
