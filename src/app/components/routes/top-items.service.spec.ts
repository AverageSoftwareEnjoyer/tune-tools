import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
    mockAlbum,
    mockAlbumLimited,
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

    it("should convert TopArtist to TopArtistLimited", () => {
        const result = topItemsService.convertTopArtistToLimited(mockTopArtist);
        expect(result).toEqual(mockTopArtistLimited);
    });
});
