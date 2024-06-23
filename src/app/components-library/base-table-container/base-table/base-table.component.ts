import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-base-table",
    standalone: true,
    imports: [],
    templateUrl: "./base-table.component.html",
    styleUrl: "./base-table.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTableComponent {}
