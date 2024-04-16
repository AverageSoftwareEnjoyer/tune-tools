import { Routes } from "@angular/router";

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "home",
        loadComponent: () =>
            import("./components/routes/home/home.component").then(
                (component) => component.HomeComponent,
            ),
    },
    {
        path: "top-tracks",
        loadChildren: () =>
            import("./components/routes/top-tracks/top-tracks.routes"),
    },
    {
        path: "top-artists",
        loadChildren: () =>
            import("./components/routes/top-artists/top-artists.routes"),
    },
    {
        path: "top-genres",
        loadChildren: () =>
            import("./components/routes/top-genres/top-genres.routes"),
    },
    {
        path: "recently-played",
        loadChildren: () =>
            import(
                "./components/routes/recently-played/recently-played.routes"
            ),
    },
    {
        path: "playlists",
        loadChildren: () =>
            import("./components/routes/playlists/playlists.routes"),
    },
    {
        path: "settings",
        loadComponent: () =>
            import("./components/routes/settings/settings.component").then(
                (component) => component.SettingsComponent,
            ),
    },
    { path: "**", redirectTo: "/home" },
];
