import { TestBed } from "@angular/core/testing";
import {
    mockRecentlyPlayedItem,
    mockRecentlyPlayedItemGrouped,
    mockRecentlyPlayedItemLimited,
} from "@mocks/recently-played.model.mock";

import { RecentlyPlayedService } from "./recently-played.service";

describe("RecentlyPlayedService", () => {
    let recentlyPlayedService: RecentlyPlayedService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        recentlyPlayedService = TestBed.inject(RecentlyPlayedService);
    });

    it("should be created", () => {
        expect(recentlyPlayedService).toBeTruthy();
    });

    it("should convert RecentlyPlayedItem to RecentlyPlayedItemLimited", () => {
        const result = recentlyPlayedService.convertRecentlyPlayedItemToLimited(
            mockRecentlyPlayedItem,
        );
        expect(result).toStrictEqual(mockRecentlyPlayedItemLimited);
    });

    it("should convert RecentlyPlayedItem to convertRecentlyPlayedItemToGrouped", () => {
        const result = recentlyPlayedService.convertRecentlyPlayedItemToGrouped(
            mockRecentlyPlayedItemLimited,
        );
        expect(result).toStrictEqual(mockRecentlyPlayedItemGrouped);
    });

    it("should group recently played items to by their url", () => {
        const result = recentlyPlayedService.groupRecentlyPlayedItems([
            mockRecentlyPlayedItemLimited,
            mockRecentlyPlayedItemLimited,
            {
                ...mockRecentlyPlayedItemLimited,
                external_urls: { spotify: "different url" },
            },
        ]);
        expect(result.length).toBe(2);
        expect(result[0].normalizedScore).toBe(99);
        expect(result[0].score).toBe(2);
        expect(result[0].external_urls.spotify).toBe(
            mockRecentlyPlayedItemLimited.external_urls.spotify,
        );
        expect(result[1].normalizedScore).toBe(10);
        expect(result[1].score).toBe(1);
        expect(result[1].external_urls.spotify).toBe("different url");
    });

    it("groupRecentlyPlayedItems should handle an empty array of items", () => {
        const result = recentlyPlayedService.groupRecentlyPlayedItems([]);
        expect(result.length).toBe(0);
    });
});
