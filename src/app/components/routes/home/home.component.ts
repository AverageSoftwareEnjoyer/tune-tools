import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { AuthService } from "@core/auth/auth.service";
import { FAQS, FEATURES } from "@model/app.model";
import { AuthStateService } from "@state/auth-state.service";
import { MediaQueriesStateService } from "@state/media-queries-state.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatRippleModule,
    ],
    templateUrl: "./home.component.html",
    styleUrl: "./home.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
    protected readonly FEATURES = FEATURES;
    protected readonly FAQS = FAQS;

    readonly #authService = inject(AuthService);
    readonly #authStateService = inject(AuthStateService);
    readonly #mediaQueriesStateService = inject(MediaQueriesStateService);

    protected get isBelowMediumWidth(): boolean {
        return this.#mediaQueriesStateService.isBelowMediumWidth();
    }

    protected get isUserAuthenticated(): boolean {
        return this.#authStateService.isUserAuthenticated;
    }

    /**
     * Triggers a redirection to Spotify auth code flow.
     *
     * @protected
     */
    protected handleSpotifyConnection(): void {
        this.#authService.redirectToAuthCodeFlow$();
    }
}
