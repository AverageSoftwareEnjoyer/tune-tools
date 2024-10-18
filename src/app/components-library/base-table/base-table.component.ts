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
    inject,
    input,
    OnChanges,
    OnInit,
    signal,
    ViewEncapsulation,
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
        KeyValuePipe,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatTableModule,
        NgStyle,
        TitleCasePipe,
        TopTracksDetailsComponent,
    ],
    providers: [TitleCasePipe],
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
    implements OnChanges, OnInit
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

    #genresMaxScore = signal(0).asReadonly();

    readonly #titleCasePipe = inject(TitleCasePipe);

    ngOnInit(): void {
        if (this.itemsType() === "genres") {
            this.#genresMaxScore = computed(
                () => (this.items() as TopItemsMappings["genres"][])[0].score,
            );
        }
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

    /**
     * Converts an array of genres into a comma separated string containing their names, with each
     * genre name being transformed to TitleCase. IF there are no genres to be converted, "Unknown"
     * is returned instead.
     *
     * @protected
     * @param genres - The list of genres to be converted into a string.
     * @returns A string containing comma separated genres.
     */
    protected getGenresNames(genres: string[]): string {
        return genres.length
            ? genres
                  .map((genre) => this.#titleCasePipe.transform(genre))
                  .join(", ")
            : "Unknown";
    }

    /**
     * Normalizes genre score based on the maximum score in the current array of genres.
     *
     * @protected
     * @param score - Genre score to normalize.
     * @returns A normalized genre score.
     */
    protected normalizeGenreScore(score: number): number {
        return (score / (this.#genresMaxScore() + 2)) * 100;
    }
}
