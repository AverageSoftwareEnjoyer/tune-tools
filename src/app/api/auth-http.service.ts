import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TokenResponse } from "@dto/spotify";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class AuthHTTPService {
    readonly #httpClient = inject(HttpClient);

    /**
     * Retrieves an access token using an authorization code and verifier.
     *
     * @param verifier - The code verifier used in the PKCE flow.
     * @param code - The authorization code received from the authorization server.
     * @returns An Observable that emits the `TokenResponse`.
     */
    getAccessToken$(verifier: string, code: string): Observable<TokenResponse> {
        const params = new HttpParams()
            .set("client_id", environment.clientId)
            .set("grant_type", "authorization_code")
            .set("redirect_uri", environment.redirectUri)
            .set("code", code)
            .set("code_verifier", verifier);

        return this.#httpClient.post<TokenResponse>(
            environment.tokenUrl,
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
    }

    /**
     * Refreshes the access token using a refresh token.
     *
     * @param refreshToken - The refresh token used to obtain a new access token.
     * @returns An Observable that emits the `TokenResponse`.
     */
    refreshAccessToken$(refreshToken: string): Observable<TokenResponse> {
        const params = new HttpParams()
            .set("client_id", environment.clientId)
            .set("grant_type", "refresh_token")
            .set("refresh_token", refreshToken);

        return this.#httpClient.post<TokenResponse>(
            environment.tokenUrl,
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
    }
}
