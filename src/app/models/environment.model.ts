export interface Environment {
    production: boolean;
    clientId: string;
    redirectUri: string;
    scope: string;
    authUrl: string;
    tokenUrl: string;
}
