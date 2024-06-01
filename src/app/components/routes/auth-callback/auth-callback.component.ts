import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { AuthService } from "@core/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-auth-callback",
    standalone: true,
    imports: [],
    templateUrl: "./auth-callback.component.html",
    styleUrl: "./auth-callback.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthCallbackComponent implements OnInit, OnDestroy {
    #handleAuthCallbackSubscription = new Subscription();

    readonly #authService = inject(AuthService);

    ngOnInit(): void {
        this.#handleAuthCallbackSubscription = this.#authService
            .handleAuthCallback$()
            .subscribe();
    }

    ngOnDestroy(): void {
        this.#handleAuthCallbackSubscription.unsubscribe();
    }
}
