import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { AuthService } from "@core/auth/auth.service";

@Component({
    selector: "app-auth-callback",
    standalone: true,
    imports: [],
    templateUrl: "./auth-callback.component.html",
    styleUrl: "./auth-callback.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent {
    readonly #authService = inject(AuthService);

    constructor() {
        toSignal(this.#authService.handleAuthCallback$());
    }
}
