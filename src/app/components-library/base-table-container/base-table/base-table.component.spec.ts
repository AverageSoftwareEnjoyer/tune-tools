import { signal } from "@angular/core";
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
            component.items = [mockTopTrackLimited];
            component.itemsType = "tracks";
            component.columnsMappings = signal(TOP_TRACKS_COLUMNS_MAPPINGS);
            component.isBelowMediumWidth = signal(false);
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
            component.items = [mockTopArtistLimited];
            component.itemsType = "artists";
            component.columnsMappings = signal(TOP_ARTISTS_COLUMNS_MAPPINGS);
            component.isBelowMediumWidth = signal(false);
        });

        it("should create", () => {
            fixture.detectChanges();

            expect(component).toBeTruthy();
        });

        it("should correctly handle the lack of genres", () => {
            component.items = [{ ...mockTopArtistLimited, genres: [] }];
            fixture.detectChanges();

            const { debugElement } = fixture;
            const [, , , genreCell] = debugElement.queryAll(By.css("tbody td"));

            expect((genreCell.nativeElement as HTMLElement).textContent).toBe(
                " Genres: Unknown ",
            );
        });
    });
});
