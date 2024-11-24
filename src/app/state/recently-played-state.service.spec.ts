import { provideHttpClient } from "@angular/common/http";
import {
    HttpTestingController,
    provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RecentlyPlayedHTTPService } from "@api/recently-played-http.service";
import {
    mockRecentlyPlayedItemGrouped,
    mockRecentlyPlayedItemLimited,
    mockRecentlyPlayedResponse,
} from "@mocks/recently-played.model.mock";
import { of } from "rxjs";

import { RecentlyPlayedStateService } from "./recently-played-state.service";

describe("RecentlyPlayedStateService", () => {
    let recentlyPlayedStateService: RecentlyPlayedStateService;
    let recentlyPlayedHTTPService: RecentlyPlayedHTTPService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        recentlyPlayedHTTPService = TestBed.inject(RecentlyPlayedHTTPService);
        recentlyPlayedHTTPService.getRecentlyPlayedItems$ = jest
            .fn()
            .mockImplementation(() => of(mockRecentlyPlayedResponse));
        recentlyPlayedStateService = TestBed.inject(RecentlyPlayedStateService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(recentlyPlayedStateService).toBeTruthy();
    });

    it("should get recently played items limited", () => {
        let result;
        recentlyPlayedStateService.recentlyPlayedItemsLimited$.subscribe(
            (res) => {
                result = res;
            },
        );

        expect(result).toStrictEqual([
            mockRecentlyPlayedItemLimited,
            mockRecentlyPlayedItemLimited,
        ]);
    });

    it("should get recently played items grouped", () => {
        let result;
        recentlyPlayedStateService.recentlyPlayedItemsGrouped$.subscribe(
            (res) => {
                result = res;
            },
        );

        expect(result).toStrictEqual([
            {
                ...mockRecentlyPlayedItemGrouped,
                score: 2,
                normalizedScore: 99,
            },
        ]);
    });

    it("should get recently played items limited and replay the saved data on subscription without retriggering the stream", () => {
        const spy = jest.spyOn(
            recentlyPlayedHTTPService,
            "getRecentlyPlayedItems$",
        );

        let result;
        const sub =
            recentlyPlayedStateService.recentlyPlayedItemsLimited$.subscribe(
                (res) => {
                    result = res;
                },
            );

        expect(result).toStrictEqual([
            mockRecentlyPlayedItemLimited,
            mockRecentlyPlayedItemLimited,
        ]);

        sub.unsubscribe();
        recentlyPlayedStateService.recentlyPlayedItemsLimited$.subscribe(
            (res) => {
                result = res;
            },
        );

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
