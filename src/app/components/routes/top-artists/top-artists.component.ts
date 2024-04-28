import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-top-artists",
    standalone: true,
    imports: [],
    templateUrl: "./top-artists.component.html",
    styleUrl: "./top-artists.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArtistsComponent {}
