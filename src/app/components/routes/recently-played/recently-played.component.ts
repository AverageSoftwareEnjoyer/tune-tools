import {
    AsyncPipe,
    DatePipe,
    KeyValuePipe,
    NgStyle,
    TitleCasePipe,
} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { keepOrder } from "@core/helpers";
import {
    RECENTLY_PLAYED_COLUMNS_KEYS_ALL,
    RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_DEFAULT,
    RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_GROUPED,
    RECENTLY_PLAYED_ROUTES,
    RecentlyPlayedColumnKeysDefault,
    RecentlyPlayedColumnKeysGrouped,
    RecentlyPlayedItemGrouped,
    RecentlyPlayedItemLimited,
    RecentlyPlayedRoutesOptions,
} from "@model/recently-played.model";
import { RecentlyPlayedStateService } from "@state/recently-played-state.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-recently-played",
    standalone: true,
    imports: [
        AsyncPipe,
        DatePipe,
        KeyValuePipe,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatTooltipModule,
        NgStyle,
        RouterLink,
        TitleCasePipe,
    ],
    templateUrl: "./recently-played.component.html",
    styleUrl: "./recently-played.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentlyPlayedComponent {
    viewType = input.required<RecentlyPlayedRoutesOptions>();

    protected readonly keepOrder = keepOrder;
    protected readonly RECENTLY_PLAYED_COLUMNS_KEYS_ALL =
        RECENTLY_PLAYED_COLUMNS_KEYS_ALL;
    protected readonly RECENTLY_PLAYED_ROUTES = RECENTLY_PLAYED_ROUTES;

    protected readonly columns = computed(() => {
        const viewType = this.viewType();
        if (viewType === RECENTLY_PLAYED_ROUTES.Default) {
            return RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_DEFAULT;
        }
        return RECENTLY_PLAYED_COLUMNS_KEYS_MAPPINGS_GROUPED;
    });

    protected readonly columnKeys = computed(
        () =>
            Object.keys(this.columns()) as (
                | RecentlyPlayedColumnKeysDefault
                | RecentlyPlayedColumnKeysGrouped
            )[],
    );

    protected readonly switchToView = computed(() => {
        const viewType = this.viewType();
        if (viewType === RECENTLY_PLAYED_ROUTES.Default) {
            return RECENTLY_PLAYED_ROUTES.Grouped;
        }
        return RECENTLY_PLAYED_ROUTES.Default;
    });

    readonly #recentlyPlayedStateService = inject(RecentlyPlayedStateService);

    protected get items$(): Observable<
        (RecentlyPlayedItemLimited | RecentlyPlayedItemGrouped)[]
    > {
        const viewType = this.viewType();
        if (viewType === RECENTLY_PLAYED_ROUTES.Default) {
            return this.#recentlyPlayedStateService.recentlyPlayedItemsLimited$;
        }
        return this.#recentlyPlayedStateService.recentlyPlayedItemsGrouped$;
    }
}
