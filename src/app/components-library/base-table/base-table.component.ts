import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { KeyValuePipe, NgStyle, TitleCasePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    OnChanges,
    ViewEncapsulation,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { keepOrder } from "@core/helpers";
import { ItemImageComponent } from "@lib/item-image/item-image.component";
import { JoinArrayToStringPipe } from "@lib/pipes/join-array-to-string/join-array-to-string.pipe";
import { ImageSizeOptions } from "@model/image.model";
import {
    TopItemsColumnsKeys,
    TopItemsColumnsMappings,
    TopItemsMappings,
    TopItemsTypeExtended,
} from "@model/top-items.model";
import { TopTracksDetailsComponent } from "@routes/top-tracks/top-tracks-details/top-tracks-details.component";

@Component({
    selector: "app-base-table",
    standalone: true,
    imports: [
        ItemImageComponent,
        JoinArrayToStringPipe,
        KeyValuePipe,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatTableModule,
        NgStyle,
        TitleCasePipe,
        TopTracksDetailsComponent,
    ],
    templateUrl: "./base-table.component.html",
    styleUrl: "./base-table.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("detailExpand", [
            state("collapsed,void", style({ height: "0", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"),
            ),
        ]),
    ],
    encapsulation: ViewEncapsulation.None,
})
export class BaseTableComponent<T extends TopItemsTypeExtended>
    implements OnChanges
{
    items = input.required<TopItemsMappings[T][]>();
    itemsType = input.required<T>();
    columnsMappings = input.required<TopItemsColumnsMappings[T]>();

    isBelowMediumWidth = input.required<boolean>();

    protected readonly keepOrder = keepOrder;
    protected readonly TopItemsColumnsKeys = TopItemsColumnsKeys;
    protected readonly ImageSizeOptions = ImageSizeOptions;

    protected expandedItem: TopItemsMappings[T] | null = null;

    protected columns = computed(
        () => Object.keys(this.columnsMappings()) as TopItemsColumnsKeys[],
    );

    protected columnsWithExpand = computed(() => [
        ...this.columns(),
        ...(this.itemsType() === "tracks" ? [TopItemsColumnsKeys.Expand] : []),
    ]);

    ngOnChanges(): void {
        this.expandedItem = null;
    }
}
