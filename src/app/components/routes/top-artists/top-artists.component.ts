import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    input,
    Signal,
    untracked,
} from "@angular/core";
import { BaseTabsContainerComponent } from "@lib/base-tabs-container/base-tabs-container.component";
import {
    TimeRangeOptions,
    TOP_ARTISTS_COLUMNS_MAPPINGS,
    TOP_ARTISTS_COLUMNS_MAPPINGS_FILTERED,
} from "@model/top-items.model";
import { MediaQueriesStateService } from "@state/media-queries-state.service";
import { TopItemsStateService } from "@state/top-items-state.service";

@Component({
    selector: "app-top-artists",
    standalone: true,
    imports: [BaseTabsContainerComponent],
    templateUrl: "./top-artists.component.html",
    styleUrl: "./top-artists.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArtistsComponent {
    timeRange = input.required<TimeRangeOptions>();

    readonly #mediaQueriesStateService = inject(MediaQueriesStateService);

    protected readonly columnsMappings = computed(() => {
        if (this.isBelowMediumWidth()) {
            return TOP_ARTISTS_COLUMNS_MAPPINGS_FILTERED;
        }
        return TOP_ARTISTS_COLUMNS_MAPPINGS;
    });

    protected readonly topItemsStateService = inject(TopItemsStateService);

    protected get isBelowMediumWidth(): Signal<boolean> {
        return this.#mediaQueriesStateService.isBelowMediumWidth;
    }

    constructor() {
        effect(() => {
            const timeRange = this.timeRange();
            untracked(() =>
                this.topItemsStateService.publishTopArtistsTimeRange(timeRange),
            );
        });
    }
}
