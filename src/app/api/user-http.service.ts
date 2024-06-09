import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { UserInfo } from "@model/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserHTTPService {
    readonly #url = `${environment.apiBaseUrl}/me`;

    readonly #httpClient = inject(HttpClient);

    /**
     * Gets the current user info from the Spotify API.
     *
     * @returns An observable that emits the current user info.
     */
    getUserInfo$(): Observable<UserInfo> {
        return this.#httpClient.get<UserInfo>(this.#url);
    }
}
