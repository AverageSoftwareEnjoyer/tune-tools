import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import {
    mockTopArtistLimited,
    mockTopTrackLimited,
} from "@mocks/top-items.model.mock";
import {
    TOP_ARTISTS_COLUMNS_MAPPINGS,
    TOP_TRACKS_COLUMNS_MAPPINGS,
} from "@model/top-items.model";

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
            fixture.componentRef.setInput("items", [mockTopTrackLimited]);
            fixture.componentRef.setInput("itemsType", "tracks");
            fixture.componentRef.setInput(
                "columnsMappings",
                TOP_TRACKS_COLUMNS_MAPPINGS,
            );
            fixture.componentRef.setInput("isBelowMediumWidth", false);
            fixture.detectChanges();
        });

        it("should create", () => {
            expect(component).toBeTruthy();
        });
    });

    describe("artists", () => {
        let component: BaseTableComponent<"artists">;
        let fixture: ComponentFixture<BaseTableComponent<"artists">>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [BaseTableComponent, NoopAnimationsModule],
            });

            fixture = TestBed.createComponent(BaseTableComponent<"artists">);
            component = fixture.componentInstance;
            fixture.componentRef.setInput("items", [mockTopArtistLimited]);
            fixture.componentRef.setInput("itemsType", "artists");
            fixture.componentRef.setInput(
                "columnsMappings",
                TOP_ARTISTS_COLUMNS_MAPPINGS,
            );
            fixture.componentRef.setInput("isBelowMediumWidth", false);
        });

        it("should create", () => {
            fixture.detectChanges();

            expect(component).toBeTruthy();
        });

        it("should correctly handle the lack of genres", () => {
            fixture.componentRef.setInput("items", [
                { ...mockTopArtistLimited, genres: [] },
            ]);
            fixture.detectChanges();

            const { debugElement } = fixture;
            const [, , , genreCell] = debugElement.queryAll(By.css("tbody td"));

            expect((genreCell.nativeElement as HTMLElement).textContent).toBe(
                " Genres: Unknown ",
            );
        });
    });
});
