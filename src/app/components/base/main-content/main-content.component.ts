import { AsyncPipe } from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    inject,
    ViewChild,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { MediaQueriesStateService } from "@state/media-queries-state.service";
import { map } from "rxjs";

import { HeaderComponent } from "../header/header.component";
import { SidenavService } from "../sidenav.service";

@Component({
    selector: "app-main-content",
    standalone: true,
    imports: [
        RouterModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        HeaderComponent,
        AsyncPipe,
    ],
    templateUrl: "./main-content.component.html",
    styleUrl: "./main-content.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent implements AfterViewInit {
    @ViewChild("menu") sidenav!: MatSidenav;

    readonly #changeDetectorRef = inject(ChangeDetectorRef);
    readonly #destroyRef = inject(DestroyRef);
    readonly #mediaQueriesStateService = inject(MediaQueriesStateService);
    readonly #sidenavService = inject(SidenavService);

    protected get isBelowMediumWidth(): boolean {
        return this.#mediaQueriesStateService.isBelowMediumWidth();
    }

    ngAfterViewInit(): void {
        this.#sidenavService.toggleSidenav$
            .pipe(
                map(() => this.sidenav.toggle()),
                takeUntilDestroyed(this.#destroyRef),
            )
            .subscribe(() => {
                this.#changeDetectorRef.markForCheck();
            });
    }
}
