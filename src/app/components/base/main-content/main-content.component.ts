import { AsyncPipe } from "@angular/common";
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    ViewChild,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";

import { DestroyClass } from "../../../core/destroy/destroy.class";
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
export class MainContentComponent
    extends DestroyClass
    implements AfterViewInit {
    @ViewChild("menu") sidenav!: MatSidenav;
    @Input() isBelowMediumWidth!: boolean | null;

    readonly #sidenavService = inject(SidenavService);
    readonly #changeDetectorRef = inject(ChangeDetectorRef);

    ngAfterViewInit(): void {
        this.#sidenavService.toggleSidenav$
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.sidenav.toggle();
                this.#changeDetectorRef.markForCheck();
            });
    }
}
