import { computed, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TopItemsHTTPService } from "@api/top-items-http.service";
import {
    Album,
    SimplifiedArtist,
    TimeRangeOptions,
    TopItemsState,
    TopTrack,
    TopTrackLimited,
} from "@model/top-items.model";
import { TopItemsService } from "@routes/top-items.service";
import { map, of, Subject, switchMap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TopItemsStateService {
    readonly #topItemsHTTPService = inject(TopItemsHTTPService);
    readonly #topItemsService = inject(TopItemsService);

    readonly #topTracksState = signal<TopItemsState<TopTrackLimited>>({
        itemsByTimeRange: {
            [TimeRangeOptions.ShortTerm]: [],
            [TimeRangeOptions.MediumTerm]: [],
            [TimeRangeOptions.LongTerm]: [],
        },
        currentTimeRange: TimeRangeOptions.ShortTerm,
    });

    // #region selectors
    topTracks = computed(
        () =>
            this.#topTracksState().itemsByTimeRange[
                this.#topTracksState().currentTimeRange
            ],
    );

    topTracksTimeRange = computed(
        () => this.#topTracksState().currentTimeRange,
    );
    // #endregion

    // #region sources
    readonly #topTracksTimeRange$ = new Subject<TimeRangeOptions>();

    readonly #topTracks$ = this.#topTracksTimeRange$.pipe(
        switchMap((timeRange) => {
            const topTracksByTimeRange =
                this.#topTracksState().itemsByTimeRange[timeRange];
            if (topTracksByTimeRange.length) {
                return of(topTracksByTimeRange);
            }
            return this.#topItemsHTTPService
                .getTopItems$<TopTrack<Album, SimplifiedArtist>, "tracks">(
                    "tracks",
                    {
                        time_range: timeRange,
                        limit: 50,
                        offset: 0,
                    },
                )
                .pipe(
                    map(({ items }) =>
                        items.map((item) =>
                            this.#topItemsService.convertTopTrackToLimited(
                                item,
                            ),
                        ),
                    ),
                );
        }),
    );
    // #endregion

    constructor() {
        // #region reducers
        this.#topTracksTimeRange$
            .pipe(takeUntilDestroyed())
            .subscribe((timeRange) => {
                this.#topTracksState.update(
                    (state): TopItemsState<TopTrackLimited> => ({
                        ...state,
                        currentTimeRange: timeRange,
                    }),
                );
            });

        this.#topTracks$.pipe(takeUntilDestroyed()).subscribe((tracks) =>
            this.#topTracksState.update(
                (state): TopItemsState<TopTrackLimited> => ({
                    ...state,
                    itemsByTimeRange: {
                        ...state.itemsByTimeRange,
                        [state.currentTimeRange]: tracks,
                    },
                }),
            ),
        );
        // #endregion
    }

    /**
     * Publishes a new time range to the `topTracksTimeRange$` subject, updating the current time
     * range for top tracks.
     *
     * @param timeRange - The new time range to be published.
     */
    publishTopTracksTimeRange(timeRange: TimeRangeOptions): void {
        this.#topTracksTimeRange$.next(timeRange);
    }
}
