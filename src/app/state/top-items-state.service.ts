import { computed, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TopItemsHTTPService } from "@api/top-items-http.service";
import {
    Album,
    SimplifiedArtist,
    TimeRangeOptions,
    TopArtist,
    TopArtistLimited,
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

    readonly #topArtistsState = signal<TopItemsState<TopArtistLimited>>({
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

    topArtists = computed(
        () =>
            this.#topArtistsState().itemsByTimeRange[
                this.#topArtistsState().currentTimeRange
            ],
    );

    topArtistsTimeRange = computed(
        () => this.#topArtistsState().currentTimeRange,
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

    readonly #topArtistsTimeRange$ = new Subject<TimeRangeOptions>();

    readonly #topArtists$ = this.#topArtistsTimeRange$.pipe(
        switchMap((timeRange) => {
            const topArtistsByTimeRange =
                this.#topArtistsState().itemsByTimeRange[timeRange];
            if (topArtistsByTimeRange.length) {
                return of(topArtistsByTimeRange);
            }
            return this.#topItemsHTTPService
                .getTopItems$<TopArtist, "artists">("artists", {
                    time_range: timeRange,
                    limit: 50,
                    offset: 0,
                })
                .pipe(
                    map(({ items }) =>
                        items.map((item) =>
                            this.#topItemsService.convertTopArtistToLimited(
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

        this.#topArtistsTimeRange$
            .pipe(takeUntilDestroyed())
            .subscribe((timeRange) => {
                this.#topArtistsState.update(
                    (state): TopItemsState<TopArtistLimited> => ({
                        ...state,
                        currentTimeRange: timeRange,
                    }),
                );
            });

        this.#topArtists$.pipe(takeUntilDestroyed()).subscribe((artists) =>
            this.#topArtistsState.update(
                (state): TopItemsState<TopArtistLimited> => ({
                    ...state,
                    itemsByTimeRange: {
                        ...state.itemsByTimeRange,
                        [state.currentTimeRange]: artists,
                    },
                }),
            ),
        );
        // #endregion
    }

    /**
     * Publishes a new time range to the `#topTracksTimeRange$` subject, updating the current time
     * range for top tracks.
     *
     * @param timeRange - The new time range to be published.
     */
    publishTopTracksTimeRange(timeRange: TimeRangeOptions): void {
        this.#topTracksTimeRange$.next(timeRange);
    }

    /**
     * Publishes a new time range to the `#topArtistsTimeRange$` subject, updating the current time
     * range for top artists.
     *
     * @param timeRange - The new time range to be published.
     */
    publishTopArtistsTimeRange(timeRange: TimeRangeOptions): void {
        this.#topArtistsTimeRange$.next(timeRange);
    }
}
