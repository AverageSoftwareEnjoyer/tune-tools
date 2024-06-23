import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import {
    Album,
    TopArtist,
    TopItems,
    TopItemsParams,
    TopItemsType,
    TopTrack,
} from "@model/top-items.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TopItemsHTTPService {
    readonly #url = `${environment.apiBaseUrl}/me/top`;

    readonly #httpClient = inject(HttpClient);

    /**
     * Fetches top items from the API based on the specified type and parameters.
     *
     * @param type - The type of top items to fetch. This determines the endpoint to which the HTTP request is made.
     * @param params - Additional query parameters for the request, such as time range, limit and offset.
     * @returns An observable that emits the fetched top items.
     */
    getTopItems$<
        T extends TopArtist | TopTrack<Album, TopArtist>,
        U extends TopItemsType,
    >(type: U, params: TopItemsParams): Observable<TopItems<T>> {
        return this.#httpClient.get<TopItems<T>>(`${this.#url}/${type}`, {
            params,
        });
    }
}
