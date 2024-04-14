import { inject } from "@angular/core";
import { Router, Routes } from "@angular/router";

import { PlaylistsComponent } from "./playlists.component";

const playlistGuard = (): Promise<boolean> => {
    const router = inject(Router);
    return router.navigate(["/playlists"]);
};

export default [
    { path: "", component: PlaylistsComponent, pathMatch: "full" },
    {
        path: "workflows",
        component: PlaylistsComponent,
        canActivate: [playlistGuard],
    },
    { path: "**", redirectTo: "" },
] as Routes;
