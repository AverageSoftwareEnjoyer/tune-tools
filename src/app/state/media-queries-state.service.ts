import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { shareReplay } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class MediaQueriesStateService {
    isBelowMediumWidth = signal(false);

    readonly #breakpointObserver = inject(BreakpointObserver);

    constructor() {
        this.#breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(shareReplay(), takeUntilDestroyed())
            .subscribe(({ matches }) => {
                this.isBelowMediumWidth.update(() => matches);
            });
    }
}
