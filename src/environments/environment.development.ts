import { Environment } from "./environment.model";

export const environment: Environment = {
    production: false,
    clientId: "d9716dd3efb4408491738456849796a1",
    redirectUri: "http://localhost:4200/auth-callback",
    scope: "playlist-modify-private playlist-modify-public user-read-private user-read-recently-played user-top-read",
    authUrl: "https://accounts.spotify.com/authorize",
    tokenUrl: "https://accounts.spotify.com/api/token",
};
