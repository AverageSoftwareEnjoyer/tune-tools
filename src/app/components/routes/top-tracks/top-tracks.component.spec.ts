import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import {
    TimeRangeOptions,
    TOP_TRACKS_COLUMNS_MAPPINGS,
    TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED,
} from "@model/top-items.model";
import { MediaQueriesStateService } from "@state/media-queries-state.service";
import { TopItemsStateService } from "@state/top-items-state.service";

import { TopTracksComponent } from "./top-tracks.component";

describe("TopTracksComponent", () => {
    let component: TopTracksComponent;
    let fixture: ComponentFixture<TopTracksComponent>;
    let topItemsStateService: TopItemsStateService;
    let mediaQueriesStateService: MediaQueriesStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TopTracksComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        });

        topItemsStateService = TestBed.inject(TopItemsStateService);
        topItemsStateService.publishTopTracksTimeRange = jest.fn();
        mediaQueriesStateService = TestBed.inject(MediaQueriesStateService);
        mediaQueriesStateService.isBelowMediumWidth = signal(true);
        fixture = TestBed.createComponent(TopTracksComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput("timeRange", TimeRangeOptions.ShortTerm);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should publish time range on input changes", () => {
        fixture.detectChanges();

        expect(
            topItemsStateService.publishTopTracksTimeRange,
        ).toHaveBeenCalledWith(TimeRangeOptions.ShortTerm);
    });

    it("should store the correct columns mapping depending on the device screen size", () => {
        expect(component["columnsMappings"]()).toEqual(
            TOP_TRACKS_COLUMNS_MAPPINGS_FILTERED,
        );

        mediaQueriesStateService.isBelowMediumWidth.update(() => false);

        expect(component["columnsMappings"]()).toEqual(
            TOP_TRACKS_COLUMNS_MAPPINGS,
        );
    });
});
