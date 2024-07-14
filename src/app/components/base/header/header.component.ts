import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { MediaQueriesStateService } from "@state/media-queries-state.service";

import { SidenavService } from "../sidenav.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        AsyncPipe,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatRippleModule,
        MatToolbarModule,
        RouterModule,
    ],
    templateUrl: "./header.component.html",
    styleUrl: "./header.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    readonly #mediaQueriesStateService = inject(MediaQueriesStateService);
    readonly #sidenavService = inject(SidenavService);

    protected get isBelowMediumWidth(): boolean {
        return this.#mediaQueriesStateService.isBelowMediumWidth();
    }

    /**
     * Toggles the side navigation's visibility.
     */
    protected onMenuToggle(): void {
        this.#sidenavService.toggleSidenavPublish();
    }
}
