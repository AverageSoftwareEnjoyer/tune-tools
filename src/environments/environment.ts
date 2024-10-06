import { Environment } from "@model/environment.model";

export const environment: Environment = {
    production: true,
    clientId: "<value>",
    redirectUri:
        "https://averagesoftwareenjoyer.github.io/tune-tools/auth-callback",
    scope: "playlist-modify-private playlist-modify-public user-read-private user-read-email user-read-recently-played user-top-read",
    authUrl: "https://accounts.spotify.com/authorize",
    tokenUrl: "https://accounts.spotify.com/api/token",
    apiBaseUrl: "https://api.spotify.com/v1",
};
