import { inject } from "@angular/core";
import { Routes } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { AuthStateService } from "@state/auth.state.service";
import { Observable } from "rxjs";

const authGuard = (): true | Observable<boolean> => {
    const authService = inject(AuthService);
    const authStateService = inject(AuthStateService);

    return authStateService.isUserAuthenticated ?
        true :
        authService.redirectToAuthCodeFlow$();
};

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    {
        path: "auth-callback",
        loadComponent: () =>
            import(
                "./components/routes/auth-callback/auth-callback.component"
            ).then((component) => component.AuthCallbackComponent),
    },
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
        canActivate: [authGuard],
    },
    {
        path: "top-artists",
        loadChildren: () =>
            import("./components/routes/top-artists/top-artists.routes"),
        canActivate: [authGuard],
    },
    {
        path: "top-genres",
        loadChildren: () =>
            import("./components/routes/top-genres/top-genres.routes"),
        canActivate: [authGuard],
    },
    {
        path: "recently-played",
        loadChildren: () =>
            import(
                "./components/routes/recently-played/recently-played.routes"
            ),
        canActivate: [authGuard],
    },
    {
        path: "playlists",
        loadChildren: () =>
            import("./components/routes/playlists/playlists.routes"),
        canActivate: [authGuard],
    },
    {
        path: "settings",
        loadComponent: () =>
            import("./components/routes/settings/settings.component").then(
                (component) => component.SettingsComponent,
            ),
        canActivate: [authGuard],
    },
    { path: "**", redirectTo: "/home" },
];
