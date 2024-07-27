import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
    mockAlbum,
    mockAlbumLimited,
    mockSimplifiedArtist,
    mockSimplifiedArtistLimited,
    mockTopArtist,
    mockTopArtistLimited,
    mockTopTrack,
    mockTopTrackLimited,
} from "@mocks/top-items.model.mock";

import { TopItemsService } from "./top-items.service";

describe("TopItemsService", () => {
    let topItemsService: TopItemsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        topItemsService = TestBed.inject(TopItemsService);
    });

    it("should be created", () => {
        expect(topItemsService).toBeTruthy();
    });

    it("should convert TopTrack to TopTrackLimited", () => {
        const result = topItemsService.convertTopTrackToLimited(mockTopTrack);
        expect(result).toEqual(mockTopTrackLimited);
    });

    it("should convert Album to AlbumLimited", () => {
        const result = topItemsService.convertAlbumToLimited(mockAlbum);
        expect(result).toEqual(mockAlbumLimited);
    });

    it("should convert SimplifiedArtist to SimplifiedArtistLimited", () => {
        const result =
            topItemsService.convertSimplifiedArtistToLimited(
                mockSimplifiedArtist,
            );
        expect(result).toEqual(mockSimplifiedArtistLimited);
    });

    it("should convert TopArtist to TopArtistLimited", () => {
        const result = topItemsService.convertTopArtistToLimited(mockTopArtist);
        expect(result).toEqual(mockTopArtistLimited);
    });

    test("should return an empty array when no artists are provided", () => {
        const result = topItemsService.convertTopArtistsToTopGenres([]);

        expect(result).toEqual([]);
    });

    test("should return an empty array when artists have no genres", () => {
        const result = topItemsService.convertTopArtistsToTopGenres([
            { ...mockTopArtist, genres: [] },
            { ...mockTopArtist, genres: [] },
        ]);

        expect(result).toEqual([]);
    });

    test("should return correct scores for genres when genres are shared among artists", () => {
        const artistsWithSharedGenres = [
            mockTopArtist,
            { ...mockTopArtist, genres: ["rock", "pop"] },
            { ...mockTopArtist, genres: ["pop"] },
        ];

        const result = topItemsService.convertTopArtistsToTopGenres(
            artistsWithSharedGenres,
        );

        expect(result).toEqual([
            { name: "rock", score: 2 },
            { name: "pop", score: 2 },
        ]);
    });

    test("should filter out genres with a score of 1", () => {
        const result = topItemsService.convertTopArtistsToTopGenres([
            mockTopArtist,
            { ...mockTopArtist, genres: ["rock", "pop"] },
        ]);
        const expectedScores = result.map((genre) => genre.score);
        expectedScores.forEach((score) => {
            expect(score).toBeGreaterThan(1);
        });
    });
});
