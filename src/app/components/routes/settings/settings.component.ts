import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { UserHTTPService } from "@api/user-http.service";

@Component({
    selector: "app-settings",
    standalone: true,
    imports: [],
    templateUrl: "./settings.component.html",
    styleUrl: "./settings.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
    readonly #userHTTPService = inject(UserHTTPService);

    constructor() {
        this.#userHTTPService
            .getUserInfo$()
            .pipe(takeUntilDestroyed())
            .subscribe();
    }
}
