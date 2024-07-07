import {
    animate,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";
import { KeyValuePipe } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { keepOrder } from "@core/helpers";
import { ItemImageComponent } from "@lib/item-image/item-image.component";
import { ImageSizeOptions } from "@model/image.model";
import {
    TopArtistLimited,
    TopItemsColumnsKeys,
    TopItemsMappings,
    TopItemsType,
    TopTracksColumnsMappingsType,
} from "@model/top-items.model";
import { TopTracksDetailsComponent } from "@routes/top-tracks/top-tracks-details/top-tracks-details.component";

@Component({
    selector: "app-base-table",
    standalone: true,
    imports: [
        ItemImageComponent,
        KeyValuePipe,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatTableModule,
        TopTracksDetailsComponent,
    ],
    templateUrl: "./base-table.component.html",
    styleUrl: "./base-table.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger("detailExpand", [
            state("collapsed,void", style({ height: "0px", minHeight: "0" })),
            state("expanded", style({ height: "*" })),
            transition(
                "expanded <=> collapsed",
                animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"),
            ),
        ]),
    ],
})
export class BaseTableComponent<T extends TopItemsType>
    implements OnInit, OnChanges {
    @Input() items!: TopItemsMappings[T][];
    @Input() itemsType!: T;
    @Input() columnsMapping!: TopTracksColumnsMappingsType;

    protected readonly keepOrder = keepOrder;
    protected readonly TopItemsColumnsKeys = TopItemsColumnsKeys;
    protected readonly ImageSizeOptions = ImageSizeOptions;

    protected expandedItem: TopItemsMappings[T] | null = null;

    protected columns: TopItemsColumnsKeys[] = [];
    protected columnsWithExpand: TopItemsColumnsKeys[] = [];

    ngOnInit(): void {
        this.columns = Object.keys(
            this.columnsMapping,
        ) as TopItemsColumnsKeys[];
        this.columnsWithExpand = [...this.columns, TopItemsColumnsKeys.Expand];
    }

    ngOnChanges(): void {
        this.expandedItem = null;
    }

    /**
     * Converts an array of artists represented by objects into a comma separated string containing
     * their names.
     *
     * @protected
     * @param artists - The list of artists to be mapped to names.
     * @returns A string containing comma separated artists names.
     */
    protected getArtistsNames(artists: TopArtistLimited[]): string {
        return artists.map(({ name }) => name).join(", ");
    }
}
