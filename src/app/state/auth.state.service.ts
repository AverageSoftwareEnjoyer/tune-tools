import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class AuthStateService {
    #isUserAuthenticated = false;
    #isUserAuthorized = false;

    get isUserAuthenticated(): boolean {
        return this.#isUserAuthenticated;
    }

    set isUserAuthenticated(value: boolean) {
        this.#isUserAuthenticated = value;
    }

    get isUserAuthorized(): boolean {
        return this.#isUserAuthorized;
    }

    set isUserAuthorized(value: boolean) {
        this.#isUserAuthorized = value;
    }
}
