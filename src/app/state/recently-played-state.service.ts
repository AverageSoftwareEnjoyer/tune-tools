import { inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RecentlyPlayedHTTPService } from "@api/recently-played-http.service";
import {
    RecentlyPlayedItemGrouped,
    RecentlyPlayedItemLimited,
} from "@model/recently-played.model";
import { RecentlyPlayedService } from "@routes/recently-played.service";
import { map, Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class RecentlyPlayedStateService {
    recentlyPlayedItemsLimited$: Observable<RecentlyPlayedItemLimited[]>;
    recentlyPlayedItemsGrouped$: Observable<RecentlyPlayedItemGrouped[]>;

    readonly #recentlyPlayedHTTPService = inject(RecentlyPlayedHTTPService);
    readonly #recentlyPlayedService = inject(RecentlyPlayedService);

    constructor() {
        this.recentlyPlayedItemsLimited$ = this.#recentlyPlayedHTTPService
            .getRecentlyPlayedItems$({
                before: new Date().getTime(),
                limit: 50,
            })
            .pipe(
                takeUntilDestroyed(),
                map(({ items }) =>
                    items.map((item) =>
                        this.#recentlyPlayedService.convertRecentlyPlayedItemToLimited(
                            item,
                        ),
                    ),
                ),
                shareReplay({ bufferSize: 1, refCount: true }),
            );

        this.recentlyPlayedItemsGrouped$ =
            this.recentlyPlayedItemsLimited$.pipe(
                takeUntilDestroyed(),
                map((items) =>
                    this.#recentlyPlayedService.groupRecentlyPlayedItems(items),
                ),
                shareReplay({ bufferSize: 1, refCount: true }),
            );
    }
}
