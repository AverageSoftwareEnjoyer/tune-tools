import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import {
    RecentlyPlayedParams,
    RecentlyPlayedResponse,
} from "@model/recently-played.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RecentlyPlayedHTTPService {
    readonly #url = `${environment.apiBaseUrl}/me/player/recently-played`;

    readonly #httpClient = inject(HttpClient);

    /**
     * Gets recently played items from the Spotify API.
     *
     * @param params Params to be used for the HTTP request, including the current time and the
     * set limit of 50.
     * @returns An observable that emits the recently played items for the current user.
     */
    getRecentlyPlayedItems$(
        params: RecentlyPlayedParams,
    ): Observable<RecentlyPlayedResponse> {
        return this.#httpClient.get<RecentlyPlayedResponse>(this.#url, {
            params,
        });
    }
}
