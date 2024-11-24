import { inject, Injectable } from "@angular/core";
import { normalizeScore } from "@core/helpers";
import {
    RecentlyPlayedItem,
    RecentlyPlayedItemGrouped,
    RecentlyPlayedItemLimited,
} from "@model/recently-played.model";

import { TopItemsService } from "./top-items.service";

@Injectable({
    providedIn: "root",
})
export class RecentlyPlayedService {
    readonly #topItemsService = inject(TopItemsService);

    /**
     *
     * Converts a `RecentlyPlayedItem` by transforming it to include only essential fields.
     *
     * @param item The object to be converted.
     * @returns An object containing a subset of properties from the original one.
     */
    convertRecentlyPlayedItemToLimited(
        item: RecentlyPlayedItem,
    ): RecentlyPlayedItemLimited {
        const { track, played_at } = structuredClone(item);
        const { name, artists, external_urls } =
            this.#topItemsService.convertTopTrackToLimited(track);
        return {
            name,
            artists,
            external_urls,
            played_at,
        };
    }

    /**
     *
     * Converts a `RecentlyPlayedItem` by transforming it to include only essential fields and
     * adding `score` and `normalizedScore.
     *
     * @param item The object to be converted.
     * @returns An object containing a subset of properties from the original one, with the
     * inclusion of `score` and `normalizedScore`.
     */
    convertRecentlyPlayedItemToGrouped(
        item: RecentlyPlayedItemLimited,
    ): RecentlyPlayedItemGrouped {
        const { name, artists, external_urls } = structuredClone(item);
        return {
            name,
            artists,
            external_urls,
            score: 0,
            normalizedScore: 0,
        };
    }

    /**
     *
     * Groups the given array of recently played items by their Spotify URL and sorts them by the
     * number of times they were played.
     *
     * @param items The array of items to be grouped.
     * @returns An array of items after grouping and sorting.
     */
    groupRecentlyPlayedItems(
        items: RecentlyPlayedItemLimited[],
    ): RecentlyPlayedItemGrouped[] {
        const convertedAndSorted = Array.from(
            items.reduce((acc, curr) => {
                const key = curr.external_urls.spotify;
                const itemByKey = acc.get(key);
                return acc.set(key, {
                    ...(itemByKey ??
                        this.convertRecentlyPlayedItemToGrouped(curr)),
                    score: (itemByKey?.score ?? 0) + 1,
                });
            }, new Map<string, RecentlyPlayedItemGrouped>()),
        )
            .map(([, value]) => value)
            .sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA);
        const maxScore = convertedAndSorted[0]?.score ?? 0;
        return convertedAndSorted.map((item) => ({
            ...item,
            normalizedScore: normalizeScore(item.score, maxScore),
        }));
    }
}
