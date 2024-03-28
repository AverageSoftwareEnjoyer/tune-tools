import { AsyncPipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";

import { SidenavService } from "../sidenav.service";

@Component({
    selector: "app-header",
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        AsyncPipe,
    ],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() isHandset!: boolean | null;

    readonly #sidenavService = inject(SidenavService);

    protected onToggleMenu(): void {
        this.#sidenavService.toggleSidenav();
    }
}
