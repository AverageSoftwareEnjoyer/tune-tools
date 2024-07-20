import { inject } from "@angular/core";
import { CanActivateFn, Routes } from "@angular/router";
import { AuthService } from "@core/auth/auth.service";
import { AuthStateService } from "@state/auth-state.service";

const authGuard: CanActivateFn = () => {
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
            import("@routes/auth-callback/auth-callback.component").then(
                (component) => component.AuthCallbackComponent,
            ),
    },
    {
        path: "home",
        loadComponent: () =>
            import("@routes/home/home.component").then(
                (component) => component.HomeComponent,
            ),
    },
    {
        path: "top-tracks",
        loadChildren: () => import("@routes/top-tracks/top-tracks.routes"),
        canActivate: [authGuard],
    },
    {
        path: "top-artists",
        loadChildren: () => import("@routes/top-artists/top-artists.routes"),
        canActivate: [authGuard],
    },
    {
        path: "top-genres",
        loadChildren: () => import("@routes/top-genres/top-genres.routes"),
        canActivate: [authGuard],
    },
    {
        path: "recently-played",
        loadChildren: () =>
            import("@routes/recently-played/recently-played.routes"),
        canActivate: [authGuard],
    },
    {
        path: "playlists",
        loadChildren: () => import("@routes/playlists/playlists.routes"),
        canActivate: [authGuard],
    },
    {
        path: "settings",
        loadComponent: () =>
            import("@routes/settings/settings.component").then(
                (component) => component.SettingsComponent,
            ),
        canActivate: [authGuard],
    },
    { path: "**", redirectTo: "/home" },
];
