import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-top-tracks",
    standalone: true,
    imports: [],
    templateUrl: "./top-tracks.component.html",
    styleUrl: "./top-tracks.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTracksComponent {}
