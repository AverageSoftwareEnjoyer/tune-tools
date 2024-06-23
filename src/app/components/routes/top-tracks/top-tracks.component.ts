import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnChanges,
} from "@angular/core";
import { TimeRangeOptions } from "@model/top-items.model";
import { TopItemsStateService } from "@state/top-items-state.service";

@Component({
    selector: "app-top-tracks",
    standalone: true,
    imports: [],
    templateUrl: "./top-tracks.component.html",
    styleUrl: "./top-tracks.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTracksComponent implements OnChanges {
    @Input() protected readonly timeRange: TimeRangeOptions =
        TimeRangeOptions.ShortTerm;

    readonly #topItemsStateService = inject(TopItemsStateService);

    ngOnChanges(): void {
        this.#topItemsStateService.publishTopTracksTimeRange(this.timeRange);
    }
}
