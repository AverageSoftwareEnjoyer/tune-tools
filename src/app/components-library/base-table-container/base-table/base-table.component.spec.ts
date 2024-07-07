import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { mockTopTrackLimited } from "@mocks/top-items.model.mock";
import { TOP_TRACKS_COLUMNS_MAPPINGS } from "@model/top-items.model";

import { BaseTableComponent } from "./base-table.component";

describe("BaseTableComponent", () => {
    describe("tracks", () => {
        let component: BaseTableComponent<"tracks">;
        let fixture: ComponentFixture<BaseTableComponent<"tracks">>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTableComponent, NoopAnimationsModule],
            });

            fixture = TestBed.createComponent(BaseTableComponent<"tracks">);
            component = fixture.componentInstance;
            component.items = [mockTopTrackLimited];
            component.itemsType = "tracks";
            component.columnsMapping = TOP_TRACKS_COLUMNS_MAPPINGS;
            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });
    });
});
