import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { AuthService } from "@core/auth/auth.service";
import { ItemImageComponent } from "@lib/item-image/item-image.component";
import { ImageSizeOptions } from "@model/image.model";
import { Image } from "@model/user.model";
import { UserStateService } from "@state/user-state.service";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [
        ItemImageComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatSlideToggleModule,
    ],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
    protected readonly ImageSizeOptions = ImageSizeOptions;

    readonly #authService = inject(AuthService);
    readonly #destroyRef = inject(DestroyRef);
    readonly #userStateService = inject(UserStateService);

    constructor() {
        if (this.#userStateService.isUserInfoStateEmpty()) {
            this.#userStateService.publishUserInfo();
        }
    }

    get countryImage(): Image {
        return this.#userStateService.countryImage();
    }

    get displayName(): string | null {
        return this.#userStateService.displayName();
    }

    get image(): Image | null {
        return this.#userStateService.image();
    }

    get id(): string | null {
        return this.#userStateService.id();
    }

    get url(): string | null {
        return this.#userStateService.url();
    }

    /**
     * Logs the current user out.
     */
    protected logout(): void {
        this.#authService
            .logoutAndRedirect$()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe();
    }
}
