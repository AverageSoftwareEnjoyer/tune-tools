import { AsyncPipe } from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnDestroy,
    ViewChild,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";

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
    styleUrls: ["./main-content.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent implements AfterViewInit, OnDestroy {
    @ViewChild("menu") sidenav!: MatSidenav;
    @Input() isHandset!: boolean | null;

    #toggleSubscription = new Subscription();

    readonly #sidenavService = inject(SidenavService);
    readonly #changeDetectorRef = inject(ChangeDetectorRef);

    ngAfterViewInit(): void {
        this.#toggleSubscription =
            this.#sidenavService.toggleSidenav$.subscribe(() => {
                this.sidenav.toggle();
                this.#changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy(): void {
        this.#toggleSubscription.unsubscribe();
    }
}
