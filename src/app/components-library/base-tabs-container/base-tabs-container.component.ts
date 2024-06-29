import { KeyValuePipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import {
    TIME_RANGE_MAPPINGS,
    TimeRangeOptions,
    TopArtistLimited,
    TopTrackLimited,
} from "@model/top-items.model";

import { keepOrder } from "./../../core/helpers";

@Component({
    selector: "app-base-tabs-container",
    standalone: true,
    imports: [KeyValuePipe, MatCardModule, MatTabsModule, RouterModule],
    templateUrl: "./base-tabs-container.component.html",
    styleUrl: "./base-tabs-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseTabsContainerComponent<
    T extends TopTrackLimited | TopArtistLimited,
> {
    @Input() items!: T[];
    @Input() currentTimeRange!: TimeRangeOptions;

    protected readonly TIME_RANGE_MAPPINGS = TIME_RANGE_MAPPINGS;
    protected readonly keepOrder = keepOrder;
}
