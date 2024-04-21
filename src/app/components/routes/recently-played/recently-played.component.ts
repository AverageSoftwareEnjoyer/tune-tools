import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-recently-played",
    standalone: true,
    imports: [],
    templateUrl: "./recently-played.component.html",
    styleUrl: "./recently-played.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedComponent {}
