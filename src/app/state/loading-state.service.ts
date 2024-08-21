import { computed, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LoadingData, LoadingState } from "@model/requests-state.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class LoadingStateService {
    readonly #loadingState = signal<LoadingState>({
        loadingMap: new Map<string, boolean>(),
    });

    // #region selectors
    readonly loadingMap = computed(() => this.#loadingState().loadingMap);

    readonly loadingMessage = computed(
        () => this.#loadingState().loadingMessage,
    );

    readonly isLoading = computed(
        () => this.#loadingState().loadingMap.size !== 0,
    );
    // #endregion

    // #region sources
    readonly #loadingState$ = new Subject<LoadingData>();
    // #endregion

    constructor() {
        // #region reducers
        this.#loadingState$
            .pipe(takeUntilDestroyed())
            .subscribe(({ url, isLoading, message }) => {
                if (isLoading) {
                    this.#loadingState.update(({ loadingMap }) => ({
                        loadingMap: loadingMap.set(url, isLoading),
                        loadingMessage: message,
                    }));
                } else if (this.loadingMap().has(url)) {
                    this.#loadingState.update(
                        ({ loadingMap, loadingMessage }) => {
                            loadingMap.delete(url);
                            return { loadingMap, loadingMessage };
                        },
                    );
                }
            });
        // #endregion
    }

    /**
     * Publishes loading data that is used to update the loading state.
     *
     * @param loadingData Loading data to be published.
     */
    publishLoadingState(loadingData: LoadingData): void {
        this.#loadingState$.next(loadingData);
    }
}
