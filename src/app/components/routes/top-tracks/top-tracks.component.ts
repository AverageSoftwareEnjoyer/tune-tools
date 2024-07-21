import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
    OnChanges,
    Signal,
} from "@angular/core";
import { BaseTabsContainerComponent } from "@lib/base-tabs-container/base-tabs-container.component";
import {
    TimeRangeOptions,
    TOP_TRACKS_COLUMNS_MAPPINGS,
    TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED,
} from "@model/top-items.model";
import { MediaQueriesStateService } from "@state/media-queries-state.service";
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
    timeRange = input.required<TimeRangeOptions>();

    readonly #mediaQueriesStateService = inject(MediaQueriesStateService);

    protected readonly columnsMappings = computed(() => {
        if (this.isBelowMediumWidth()) {
            return TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED;
        }
        return TOP_TRACKS_COLUMNS_MAPPINGS;
    });

    protected readonly topItemsStateService = inject(TopItemsStateService);

    protected get isBelowMediumWidth(): Signal<boolean> {
        return this.#mediaQueriesStateService.isBelowMediumWidth;
    }

    ngOnChanges(): void {
        this.topItemsStateService.publishTopTracksTimeRange(this.timeRange());
    }
}
