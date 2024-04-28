import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-playlists",
    standalone: true,
    imports: [],
    templateUrl: "./playlists.component.html",
    styleUrl: "./playlists.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistsComponent {}
