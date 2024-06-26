import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class SidenavService {
    toggleSidenav$: Observable<null>;

    readonly #toggleSidenavSubject = new Subject<null>();

    constructor() {
        this.toggleSidenav$ = this.#toggleSidenavSubject.asObservable();
    }

    /**
     * Publishes an event to toggle the side navigation's visibility.
     */
    toggleSidenavPublish(): void {
        this.#toggleSidenavSubject.next(null);
    }
}
