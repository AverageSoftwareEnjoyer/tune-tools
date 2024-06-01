export const KEYS = [
    "verifier",
    "access_token",
    "refresh_token",
    "token_expiry",
    "state",
] as const;

export type Key = (typeof KEYS)[number];
