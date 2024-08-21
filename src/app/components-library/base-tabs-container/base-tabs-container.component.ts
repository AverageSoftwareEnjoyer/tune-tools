import { KeyValuePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    input,
    ViewEncapsulation,
} from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule } from "@angular/router";
import { keepOrder } from "@core/helpers";
import { BaseTableComponent } from "@lib/base-table/base-table.component";
import {
    TIME_RANGE_MAPPINGS,
    TimeRangeOptions,
    TopItemsColumnsMappings,
    TopItemsMappings,
    TopItemsTypeExtended,
} from "@model/top-items.model";

@Component({
    selector: "app-base-tabs-container",
    standalone: true,
    imports: [
        BaseTableComponent,
        KeyValuePipe,
        MatCardModule,
        MatTabsModule,
        RouterModule,
    ],
    templateUrl: "./base-tabs-container.component.html",
    styleUrl: "./base-tabs-container.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class BaseTabsContainerComponent<T extends TopItemsTypeExtended> {
    items = input.required<TopItemsMappings[T][]>();
    itemsType = input.required<T>();
    columnsMappings = input.required<TopItemsColumnsMappings[T]>();

    currentTimeRange = input.required<TimeRangeOptions>();
    isBelowMediumWidth = input.required<boolean>();

    protected readonly TIME_RANGE_MAPPINGS = TIME_RANGE_MAPPINGS;
    protected readonly keepOrder = keepOrder;
}
