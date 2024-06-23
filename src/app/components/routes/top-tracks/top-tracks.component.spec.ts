import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { TimeRangeOptions } from "@model/top-items.model";
import { TopItemsStateService } from "@state/top-items-state.service";

import { TopTracksComponent } from "./top-tracks.component";

describe("TopTracksComponent", () => {
    let component: TopTracksComponent;
    let fixture: ComponentFixture<TopTracksComponent>;
    let topItemsStateService: TopItemsStateService;

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

        fixture = TestBed.createComponent(TopTracksComponent);
        component = fixture.componentInstance;
        topItemsStateService = TestBed.inject(TopItemsStateService);
        topItemsStateService.publishTopTracksTimeRange = jest.fn();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should publish time range on input changes", () => {
        component.ngOnChanges();

        expect(
            topItemsStateService.publishTopTracksTimeRange,
        ).toHaveBeenCalledWith(TimeRangeOptions.ShortTerm);
    });
});
