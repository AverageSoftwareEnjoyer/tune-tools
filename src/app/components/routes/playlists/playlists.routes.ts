import { inject } from "@angular/core";
import { Router, Routes } from "@angular/router";
import { from, Observable } from "rxjs";

import { PlaylistsComponent } from "./playlists.component";

const playlistGuard = (): Observable<boolean> => {
    const router = inject(Router);

    // TODO: Update once workflows are introduced.
    return from(router.navigateByUrl("/playlists"));
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
