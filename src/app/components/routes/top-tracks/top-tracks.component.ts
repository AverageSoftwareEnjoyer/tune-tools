import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnChanges,
} from "@angular/core";
import { BaseTabsContainerComponent } from "@lib/base-tabs-container/base-tabs-container.component";
import {
    TimeRangeOptions,
    TOP_TRACKS_COLUMNS_MAPPINGS,
} from "@model/top-items.model";
import { TopItemsStateService } from "@state/top-items-state.service";

@Component({
    selector: "app-top-tracks",
    standalone: true,
    imports: [BaseTabsContainerComponent],
    templateUrl: "./top-tracks.component.html",
    styleUrl: "./top-tracks.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopTracksComponent implements OnChanges {
    @Input() protected readonly timeRange: TimeRangeOptions =
        TimeRangeOptions.ShortTerm;

    protected readonly TOP_TRACKS_COLUMNS_MAPPING = TOP_TRACKS_COLUMNS_MAPPINGS;

    protected readonly topItemsStateService = inject(TopItemsStateService);

    ngOnChanges(): void {
        this.topItemsStateService.publishTopTracksTimeRange(this.timeRange);
    }
}
