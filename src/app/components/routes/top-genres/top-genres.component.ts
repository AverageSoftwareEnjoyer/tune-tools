import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-top-genres",
    standalone: true,
    imports: [],
    templateUrl: "./top-genres.component.html",
    styleUrl: "./top-genres.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopGenresComponent {}
