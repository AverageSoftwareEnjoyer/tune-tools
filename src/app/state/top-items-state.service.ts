import { computed, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { TopItemsHTTPService } from "@api/top-items-http.service";
import {
    Album,
    SimplifiedArtist,
    TimeRangeOptions,
    TopArtist,
    TopArtistLimited,
    TopGenreLimited,
    TopItemsByTimeRange,
    TopItemsState,
    TopTrack,
    TopTrackLimited,
} from "@model/top-items.model";
import { TopItemsService } from "@routes/top-items.service";
import { EMPTY, map, Observable, of, Subject, switchMap, tap } from "rxjs";

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

    readonly #topGenresState = signal<TopItemsState<TopGenreLimited>>({
        itemsByTimeRange: {
            [TimeRangeOptions.ShortTerm]: [],
            [TimeRangeOptions.MediumTerm]: [],
            [TimeRangeOptions.LongTerm]: [],
        },
        currentTimeRange: TimeRangeOptions.ShortTerm,
    });

    readonly #topArtistsCacheState = signal<TopItemsByTimeRange<TopArtist>>({
        [TimeRangeOptions.ShortTerm]: [],
        [TimeRangeOptions.MediumTerm]: [],
        [TimeRangeOptions.LongTerm]: [],
    });

    // #region selectors
    readonly topTracks = computed(
        () =>
            this.#topTracksState().itemsByTimeRange[
                this.#topTracksState().currentTimeRange
            ],
    );

    readonly topTracksTimeRange = computed(
        () => this.#topTracksState().currentTimeRange,
    );

    readonly topArtists = computed(
        () =>
            this.#topArtistsState().itemsByTimeRange[
                this.#topArtistsState().currentTimeRange
            ],
    );

    readonly topArtistsTimeRange = computed(
        () => this.#topArtistsState().currentTimeRange,
    );

    readonly topGenres = computed(
        () =>
            this.#topGenresState().itemsByTimeRange[
                this.#topGenresState().currentTimeRange
            ],
    );

    readonly topGenresTimeRange = computed(
        () => this.#topGenresState().currentTimeRange,
    );
    // #endregion

    // #region sources
    readonly #topTracksTimeRange$ = new Subject<TimeRangeOptions>();

    readonly #topTracks$: Observable<TopTrackLimited[]> =
        this.#topTracksTimeRange$.pipe(
            switchMap((timeRange) => {
                const topTracksByTimeRange =
                    this.#topTracksState().itemsByTimeRange[timeRange];
                if (topTracksByTimeRange.length) {
                    return EMPTY;
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

    readonly #topArtists$: Observable<TopArtistLimited[]> =
        this.#topArtistsTimeRange$.pipe(
            switchMap((timeRange) => {
                const topArtistsByTimeRange =
                    this.#topArtistsState().itemsByTimeRange[timeRange];
                if (topArtistsByTimeRange.length) {
                    return EMPTY;
                }
                const topArtistsCacheByTimeRange =
                    this.#topArtistsCacheState()[timeRange];
                return topArtistsCacheByTimeRange.length
                    ? of(topArtistsCacheByTimeRange).pipe(
                          map((items) =>
                              items.map((item) =>
                                  this.#topItemsService.convertTopArtistToLimited(
                                      item,
                                  ),
                              ),
                          ),
                      )
                    : this.#topItemsHTTPService
                          .getTopItems$<TopArtist, "artists">("artists", {
                              time_range: timeRange,
                              limit: 50,
                              offset: 0,
                          })
                          .pipe(
                              tap(({ items }) => {
                                  this.#topArtistsCacheState.update(
                                      (
                                          state,
                                      ): TopItemsByTimeRange<TopArtist> => ({
                                          ...state,
                                          [timeRange]: items,
                                      }),
                                  );
                              }),
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

    readonly #topGenresTimeRange$ = new Subject<TimeRangeOptions>();

    readonly #topGenres$ = this.#topGenresTimeRange$.pipe(
        switchMap((timeRange) => {
            const topGenresByTimeRange =
                this.#topGenresState().itemsByTimeRange[timeRange];
            if (topGenresByTimeRange.length) {
                return EMPTY;
            }
            const topArtistsCacheByTimeRange =
                this.#topArtistsCacheState()[timeRange];
            return topArtistsCacheByTimeRange.length
                ? of(topArtistsCacheByTimeRange).pipe(
                      map((items) =>
                          this.#topItemsService.convertTopArtistsToTopGenres(
                              items,
                          ),
                      ),
                  )
                : this.#topItemsHTTPService
                      .getTopItems$<TopArtist, "artists">("artists", {
                          time_range: timeRange,
                          limit: 50,
                          offset: 0,
                      })
                      .pipe(
                          tap(({ items }) => {
                              this.#topArtistsCacheState.update(
                                  (state): TopItemsByTimeRange<TopArtist> => ({
                                      ...state,
                                      [timeRange]: items,
                                  }),
                              );
                          }),
                          map(({ items }) =>
                              this.#topItemsService.convertTopArtistsToTopGenres(
                                  items,
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

        this.#topArtists$
            .pipe(takeUntilDestroyed())
            .subscribe((artists: TopArtistLimited[]) =>
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

        this.#topGenresTimeRange$
            .pipe(takeUntilDestroyed())
            .subscribe((timeRange) => {
                this.#topGenresState.update(
                    (state): TopItemsState<TopGenreLimited> => ({
                        ...state,
                        currentTimeRange: timeRange,
                    }),
                );
            });

        this.#topGenres$
            .pipe(takeUntilDestroyed())
            .subscribe((genres: TopGenreLimited[]) =>
                this.#topGenresState.update(
                    (state): TopItemsState<TopGenreLimited> => ({
                        ...state,
                        itemsByTimeRange: {
                            ...state.itemsByTimeRange,
                            [state.currentTimeRange]: genres,
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

    /**
     * Publishes a new time range to the `#topGenresTimeRange$` subject, updating the current time
     * range for top genres.
     *
     * @param timeRange - The new time range to be published.
     */
    publishTopGenresTimeRange(timeRange: TimeRangeOptions): void {
        this.#topGenresTimeRange$.next(timeRange);
    }
}
