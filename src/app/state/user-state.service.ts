import { computed, inject, Injectable, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserHTTPService } from "@api/user-http.service";
import { Image, UserInfoLimited } from "@model/user.model";
import { UserService } from "@routes/settings/user.service";
import { map, Observable, Subject, switchMap } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserStateService {
    readonly #userHTTPService = inject(UserHTTPService);
    readonly #userService = inject(UserService);

    readonly #userInfoState = signal<UserInfoLimited | null>(null);

    // #region selectors
    readonly isUserInfoStateEmpty = computed(() => !this.#userInfoState());

    readonly displayName = computed(
        () => this.#userInfoState()?.display_name ?? null,
    );

    readonly id = computed(() => this.#userInfoState()?.id ?? null);

    readonly countryImage = computed<Image>(() => ({
        url: this.#userInfoState()?.country
            ? `https://flagsapi.com/${this.#userInfoState()?.country}/flat/64.png`
            : null,
        height: null,
        width: null,
    }));

    readonly url = computed(
        () => this.#userInfoState()?.external_urls.spotify ?? null,
    );

    readonly image = computed(
        () => this.#userInfoState()?.images.at(-1) ?? null,
    );
    // #endregion

    // #region sources
    readonly #loadUserInfo$ = new Subject<void>();

    readonly #userInfo$: Observable<UserInfoLimited> = this.#loadUserInfo$.pipe(
        switchMap(() => this.#userHTTPService.getUserInfo$()),
        map((userInfo) => this.#userService.convertUserInfoToLimited(userInfo)),
    );
    // #endregion

    constructor() {
        // #reducers
        this.#userInfo$.pipe(takeUntilDestroyed()).subscribe((userInfo) => {
            this.#userInfoState.set(userInfo);
        });
        // #endregion
    }

    /**
     * Publishes a new value to the `#loadUserInfo$` subject, indicating that current user's info
     * should be loaded.
     */
    publishUserInfo(): void {
        this.#loadUserInfo$.next();
    }
}
