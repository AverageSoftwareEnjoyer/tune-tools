import {
    ChangeDetectionStrategy,
    Component,
    effect,
    inject,
    input,
    signal,
    untracked,
} from "@angular/core";
import { BaseTabsContainerComponent } from "@lib/base-tabs-container/base-tabs-container.component";
import {
    TimeRangeOptions,
    TOP_GENRES_COLUMNS_MAPPINGS_FILTERED,
} from "@model/top-items.model";
import { TopItemsStateService } from "@state/top-items-state.service";

@Component({
    selector: "app-top-genres",
    standalone: true,
    imports: [BaseTabsContainerComponent],
    templateUrl: "./top-genres.component.html",
    styleUrl: "./top-genres.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopGenresComponent {
    timeRange = input.required<TimeRangeOptions>();

    protected readonly columnsMappings = signal(
        TOP_GENRES_COLUMNS_MAPPINGS_FILTERED,
    );

    protected readonly topItemsStateService = inject(TopItemsStateService);

    constructor() {
        effect(() => {
            const timeRange = this.timeRange();
            untracked(() =>
                this.topItemsStateService.publishTopGenresTimeRange(timeRange),
            );
        });
    }
}
