import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { mockTopTrackLimited } from "@mocks/top-items.model.mock";
import {
    TimeRangeOptions,
    TOP_TRACKS_COLUMNS_MAPPINGS,
    TopTrackLimited,
} from "@model/top-items.model";

import { BaseTabsContainerComponent } from "./base-tabs-container.component";

describe("BaseTabsContainerComponent", () => {
    describe("tracks", () => {
        let component: BaseTabsContainerComponent<"tracks">;
        let fixture: ComponentFixture<BaseTabsContainerComponent<"tracks">>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTabsContainerComponent, NoopAnimationsModule],
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
                BaseTabsContainerComponent<"tracks">,
            );
            component = fixture.componentInstance;
            fixture.componentRef.setInput("items", [mockTopTrackLimited]);
            fixture.componentRef.setInput("itemsType", "tracks");
            fixture.componentRef.setInput(
                "columnsMappings",
                TOP_TRACKS_COLUMNS_MAPPINGS,
            );
            fixture.componentRef.setInput(
                "currentTimeRange",
                TimeRangeOptions.ShortTerm,
            );
            fixture.componentRef.setInput("isBelowMediumWidth", false);
            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });

        it("should render items and current time range correctly", () => {
            const mockItems: TopTrackLimited[] = [mockTopTrackLimited];
            const mockTimeRange = TimeRangeOptions.ShortTerm;

            fixture.componentRef.setInput("items", mockItems);
            fixture.componentRef.setInput("currentTimeRange", mockTimeRange);
            fixture.detectChanges();

            expect(component.items()).toBe(mockItems);
            expect(component.currentTimeRange()).toBe(mockTimeRange);
        });
    });
});
