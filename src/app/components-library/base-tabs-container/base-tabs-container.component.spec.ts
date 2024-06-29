import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { mockTopTrackLimited } from "@mocks/top-items.model.mock";
import { TimeRangeOptions, TopTrackLimited } from "@model/top-items.model";

import { BaseTabsContainerComponent } from "./base-tabs-container.component";

describe("BaseTabsContainerComponent", () => {
    let component: BaseTabsContainerComponent<TopTrackLimited>;
    let fixture: ComponentFixture<BaseTabsContainerComponent<TopTrackLimited>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BaseTabsContainerComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                    },
                },
            ],
        });

        fixture = TestBed.createComponent(
            BaseTabsContainerComponent<TopTrackLimited>,
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should render items and current time range correctly", () => {
        const mockItems: TopTrackLimited[] = [mockTopTrackLimited];
        const mockTimeRange = TimeRangeOptions.ShortTerm;

        component.items = mockItems;
        component.currentTimeRange = mockTimeRange;
        fixture.detectChanges();

        expect(component.items).toBe(mockItems);
        expect(component.currentTimeRange).toBe(mockTimeRange);
    });
});
