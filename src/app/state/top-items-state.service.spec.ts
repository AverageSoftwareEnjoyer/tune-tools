import { provideHttpClient } from "@angular/common/http";
import {
    HttpTestingController,
    provideHttpClientTesting,
} from "@angular/common/http/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { TopItemsHTTPService } from "@api/top-items-http.service";
import { environment } from "@env/environment";
import {
    mockTopArtistLimited,
    mockTopArtists,
    mockTopTrackLimited,
    mockTopTracks,
} from "@mocks/top-items.model.mock";
import { TimeRangeOptions } from "@model/top-items.model";
import { of } from "rxjs";

import { TopItemsStateService } from "./top-items-state.service";

describe("TopItemsStateService", () => {
    let topItemsStateService: TopItemsStateService;
    let topItemsHTTPService: TopItemsHTTPService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        topItemsStateService = TestBed.inject(TopItemsStateService);
        httpTestingController = TestBed.inject(HttpTestingController);
        topItemsHTTPService = TestBed.inject(TopItemsHTTPService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(topItemsStateService).toBeTruthy();
    });

    describe("tracks", () => {
        it("should publish a new time range and update the state", () => {
            const timeRange = TimeRangeOptions.MediumTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopTracks));

            topItemsStateService.publishTopTracksTimeRange(timeRange);

            expect(topItemsStateService.topTracksTimeRange()).toBe(timeRange);
        });

        it("should fetch and update top tracks for the specified time range", fakeAsync(() => {
            const timeRange = TimeRangeOptions.LongTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopTracks));

            topItemsStateService.publishTopTracksTimeRange(timeRange);
            tick();

            expect(topItemsStateService.topTracks()).toEqual([
                mockTopTrackLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(1);
        }));

        it("should fetch data again if data for the specified time range has not been loaded yed", fakeAsync(() => {
            jest.spyOn(topItemsHTTPService, "getTopItems$");

            topItemsStateService.publishTopTracksTimeRange(
                TimeRangeOptions.LongTerm,
            );
            const req1 = httpTestingController.expectOne(
                `${environment.apiBaseUrl}/me/top/tracks?time_range=long_term&limit=50&offset=0`,
            );
            req1.flush(mockTopTracks);
            tick();
            expect(req1.request.method).toBe("GET");
            expect(topItemsStateService.topTracks()).toEqual([
                mockTopTrackLimited,
            ]);

            topItemsStateService.publishTopTracksTimeRange(
                TimeRangeOptions.MediumTerm,
            );
            const req2 = httpTestingController.expectOne(
                `${environment.apiBaseUrl}/me/top/tracks?time_range=medium_term&limit=50&offset=0`,
            );
            req2.flush(mockTopTracks);
            tick();
            expect(req2.request.method).toBe("GET");

            expect(topItemsStateService.topTracks()).toEqual([
                mockTopTrackLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(2);
        }));

        it("should not fetch data again if data for the specified time range has already been loaded", fakeAsync(() => {
            const timeRange = TimeRangeOptions.LongTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopTracks));

            topItemsStateService.publishTopTracksTimeRange(timeRange);
            tick();
            topItemsStateService.publishTopTracksTimeRange(timeRange);
            tick();

            expect(topItemsStateService.topTracks()).toEqual([
                mockTopTrackLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(1);
        }));
    });

    describe("artists", () => {
        it("should publish a new time range and update the state", () => {
            const timeRange = TimeRangeOptions.MediumTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopArtists));

            topItemsStateService.publishTopArtistsTimeRange(timeRange);

            expect(topItemsStateService.topArtistsTimeRange()).toBe(timeRange);
        });

        it("should fetch and update top tracks for the specified time range", fakeAsync(() => {
            const timeRange = TimeRangeOptions.LongTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopArtists));

            topItemsStateService.publishTopArtistsTimeRange(timeRange);
            tick();

            expect(topItemsStateService.topArtists()).toEqual([
                mockTopArtistLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(1);
        }));

        it("should fetch data again if data for the specified time range has not been loaded yed", fakeAsync(() => {
            jest.spyOn(topItemsHTTPService, "getTopItems$");

            topItemsStateService.publishTopArtistsTimeRange(
                TimeRangeOptions.LongTerm,
            );
            const req1 = httpTestingController.expectOne(
                `${environment.apiBaseUrl}/me/top/artists?time_range=long_term&limit=50&offset=0`,
            );
            req1.flush(mockTopArtists);
            tick();
            expect(req1.request.method).toBe("GET");
            expect(topItemsStateService.topArtists()).toEqual([
                mockTopArtistLimited,
            ]);

            topItemsStateService.publishTopArtistsTimeRange(
                TimeRangeOptions.MediumTerm,
            );
            const req2 = httpTestingController.expectOne(
                `${environment.apiBaseUrl}/me/top/artists?time_range=medium_term&limit=50&offset=0`,
            );
            req2.flush(mockTopArtists);
            tick();
            expect(req2.request.method).toBe("GET");

            expect(topItemsStateService.topArtists()).toEqual([
                mockTopArtistLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(2);
        }));

        it("should not fetch data again if data for the specified time range has already been loaded", fakeAsync(() => {
            const timeRange = TimeRangeOptions.LongTerm;
            topItemsHTTPService.getTopItems$ = jest
                .fn()
                .mockReturnValue(of(mockTopArtists));

            topItemsStateService.publishTopArtistsTimeRange(timeRange);
            tick();
            topItemsStateService.publishTopArtistsTimeRange(timeRange);
            tick();

            expect(topItemsStateService.topArtists()).toEqual([
                mockTopArtistLimited,
            ]);
            expect(topItemsHTTPService.getTopItems$).toHaveBeenCalledTimes(1);
        }));
    });
});
