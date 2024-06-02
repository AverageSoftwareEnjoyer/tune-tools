import { HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthHTTPService } from "@api/auth-http.service";
import { environment } from "@env/environment.development";
import { AuthStateService } from "@state/auth.state.service";
import {
    catchError,
    EMPTY,
    finalize,
    forkJoin,
    from,
    map,
    Observable,
    of,
    switchMap,
    tap,
} from "rxjs";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    readonly #activatedRoute = inject(ActivatedRoute);
    readonly #authHTTPService = inject(AuthHTTPService);
    readonly #authStateService = inject(AuthStateService);
    readonly #localStorageService = inject(LocalStorageService);
    readonly #router = inject(Router);

    /**
     * Generates a random string of a given length using characters from a specified set.
     *
     * @param length - The length of the random string to generate.
     * @returns A random string of the specified length.
     */
    generateRandomString(length: number): string {
        const possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const values = crypto.getRandomValues(new Uint8Array(length));
        return values.reduce(
            (acc, x) => acc + possible[x % possible.length],
            "",
        );
    }

    /**
     * Computes the SHA-256 hash of a given string.
     *
     * @param plain - The plain text string to hash.
     * @returns An Observable that emits the resulting ArrayBuffer of the hash.
     */
    sha256$(plain: string): Observable<ArrayBuffer> {
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return from(crypto.subtle.digest("SHA-256", data));
    }

    /**
     * Encodes an ArrayBuffer to a base64 URL-safe string.
     *
     * @param input - The ArrayBuffer to encode.
     * @returns A base64 URL-safe encoded string.
     */
    base64encode(input: ArrayBuffer): string {
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            .replace(/=/g, "")
            .replace(/\+/g, "-")
            .replace(/\//g, "_");
    }

    /**
     * Redirects the user to the authorization code flow.
     *
     * Generates a random verifier and state, computes their SHA-256 hashes,
     * encodes them to base64 URL-safe strings, and constructs the authorization URL.
     * It also stores the verifier and state in local storage and finally redirects the user
     * to the constructed authorization URL.
     *
     * @returns An Observable that emits a boolean indicating the operation status.
     */
    redirectToAuthCodeFlow$(): Observable<boolean> {
        let redirectURL: string;
        const verifier = this.generateRandomString(128);
        const state = this.generateRandomString(128);
        return forkJoin([this.sha256$(verifier), this.sha256$(state)]).pipe(
            map(([verifierArray, stateArray]) => [
                this.base64encode(verifierArray),
                this.base64encode(stateArray),
            ]),
            tap(([, authState]) => {
                this.#localStorageService.setItem("verifier", verifier);
                this.#localStorageService.setItem("state", authState);
            }),
            tap(([code, authState]) => {
                const params = new HttpParams()
                    .set("client_id", environment.clientId)
                    .set("response_type", "code")
                    .set("redirect_uri", environment.redirectUri)
                    .set("scope", environment.scope)
                    .set("code_challenge_method", "S256")
                    .set("code_challenge", code)
                    .set("state", authState);
                debugger;
                redirectURL = `${environment.authUrl}?${params.toString()}`;
            }),
            map(() => false),
            finalize(() => (window.location.href = redirectURL)),
        );
    }

    /**
     * Handles the authorization callback by processing query parameters.
     *
     * Checks the authorization code and state from the query parameters
     * against the stored state. If the state matches, it proceeds to obtain the access token.
     * If the state does not match or is missing, it clears the local storage and redirects the user.
     *
     * @returns An Observable that emits a boolean indicating the success or failure of the operation.
     */
    handleAuthCallback$(): Observable<boolean> {
        return this.#activatedRoute.queryParams.pipe(
            switchMap(({ code, state }: { code?: string; state?: string }) => {
                if (
                    !code ||
                    !state ||
                    state !== this.#localStorageService.getItem("state")
                ) {
                    this.#localStorageService.clearLocalStorageItems();
                    return from(this.#router.navigateByUrl(""));
                }
                this.#localStorageService.removeItem("state");
                return this.getAccessTokenWrapper$(code);
            }),
        );
    }

    /**
     * Wraps the process of obtaining an access token using an authorization code.
     *
     * Retrieves the stored code verifier from local storage, and if the verifier is not found,
     * it clears the local storage and redirects the user. If the verifier is found, it proceeds to request
     * the access token using the provided authorization code. On success, it handles the authentication and
     * removes the verifier from local storage. On error, it clears the local storage and redirects the user.
     *
     * @param code - The authorization code received from the authorization server.
     * @returns An Observable that emits a boolean indicating the success or failure of the operation.
     */
    getAccessTokenWrapper$(code: string): Observable<boolean> {
        // TODO: Include in header interceptor
        const verifier = this.#localStorageService.getItem("verifier");
        if (!verifier) {
            this.#authStateService.isUserAuthenticated = false;
            this.#localStorageService.clearLocalStorageItems();
            return from(this.#router.navigateByUrl(""));
        }

        return this.#authHTTPService.getAccessToken$(verifier, code).pipe(
            catchError(() => {
                this.#authStateService.isUserAuthenticated = false;
                this.#localStorageService.clearLocalStorageItems();
                return from(this.#router.navigateByUrl("")).pipe(
                    switchMap(() => EMPTY),
                );
            }),
            tap(({ access_token, refresh_token }) => {
                this.#handleAuthentication(access_token, refresh_token);
                this.#localStorageService.removeItem("verifier");
            }),
            // TODO: Navigate to the requested URL instead
            switchMap(() => from(this.#router.navigateByUrl("/top-tracks"))),
        );
    }

    /**
     * Handles the case of a potentially expired access token.
     *
     * Checks if the access token, refresh token, and token expiry are present in local storage.
     * If any of these are missing, it clears the local storage and redirects the user. If the access token
     * is expired, it attempts to refresh the access token using the refresh token. If the access token is not
     * expired, it does nothing.
     *
     * @returns An Observable that emits a boolean indicating the success or failure of the operation.
     */
    handlePotentiallyExpiredAccessToken$(): Observable<boolean> {
        // TODO: Include in header interceptor
        const accessToken = this.#localStorageService.getItem("access_token");
        const refreshToken = this.#localStorageService.getItem("refresh_token");
        const expiry = this.#localStorageService.getItem("token_expiry");

        if (!accessToken || !refreshToken || !expiry) {
            this.#authStateService.isUserAuthenticated = false;
            this.#localStorageService.clearLocalStorageItems();
            return from(this.#router.navigateByUrl(""));
        }
        if (new Date() > new Date(parseInt(expiry))) {
            return this.#authHTTPService.refreshAccessToken$(refreshToken).pipe(
                tap(({ access_token, refresh_token }) =>
                    this.#handleAuthentication(access_token, refresh_token),
                ),
                map(() => false),
            );
        }
        return of(false);
    }

    /**
     * Handles authentication by storing the access token, refresh token, and token expiry time in
     * local storage.
     *
     * @param accessToken - The access token to store.
     * @param refreshToken - The refresh token to store.
     */
    #handleAuthentication(accessToken: string, refreshToken: string): void {
        this.#authStateService.isUserAuthenticated = true;
        this.#localStorageService.setItem("access_token", accessToken);
        this.#localStorageService.setItem("refresh_token", refreshToken);
        const expiryTime = new Date().getTime() + 3_600_000;
        this.#localStorageService.setItem(
            "token_expiry",
            expiryTime.toString(),
        );
    }
}
