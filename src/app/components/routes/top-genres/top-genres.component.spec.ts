import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { TimeRangeOptions } from "@model/top-items.model";
import { TopItemsStateService } from "@state/top-items-state.service";

import { TopGenresComponent } from "./top-genres.component";

describe("TopGenresComponent", () => {
    let component: TopGenresComponent;
    let fixture: ComponentFixture<TopGenresComponent>;
    let topItemsStateService: TopItemsStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TopGenresComponent],
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
        topItemsStateService.publishTopGenresTimeRange = jest.fn();
        fixture = TestBed.createComponent(TopGenresComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput("timeRange", TimeRangeOptions.ShortTerm);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should publish time range on input changes", () => {
        fixture.detectChanges();

        expect(
            topItemsStateService.publishTopGenresTimeRange,
        ).toHaveBeenCalledWith(TimeRangeOptions.ShortTerm);
    });
});
