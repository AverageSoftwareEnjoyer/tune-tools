import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import {
    mockRecentlyPlayedItemGrouped,
    mockRecentlyPlayedItemLimited,
} from "@mocks/recently-played.model.mock";
import { RECENTLY_PLAYED_ROUTES } from "@model/recently-played.model";
import { RecentlyPlayedStateService } from "@state/recently-played-state.service";
import { of } from "rxjs";

import { RecentlyPlayedComponent } from "./recently-played.component";

describe("RecentlyPlayedComponent", () => {
    let component: RecentlyPlayedComponent;
    let fixture: ComponentFixture<RecentlyPlayedComponent>;
    let recentlyPlayedStateService: RecentlyPlayedStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RecentlyPlayedComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                {
                    provide: ActivatedRoute,
                    useValue: {},
                },
            ],
        });

        recentlyPlayedStateService = TestBed.inject(RecentlyPlayedStateService);
        fixture = TestBed.createComponent(RecentlyPlayedComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        fixture.componentRef.setInput(
            "viewType",
            RECENTLY_PLAYED_ROUTES.Default,
        );
        expect(component).toBeTruthy();

        fixture.componentRef.setInput(
            "viewType",
            RECENTLY_PLAYED_ROUTES.Grouped,
        );
        expect(component).toBeTruthy();
    });

    describe("default view", () => {
        it("should correctly display the date", () => {
            recentlyPlayedStateService.recentlyPlayedItemsLimited$ = of([
                mockRecentlyPlayedItemLimited,
            ]);
            fixture.componentRef.setInput(
                "viewType",
                RECENTLY_PLAYED_ROUTES.Default,
            );
            fixture.detectChanges();

            const { debugElement } = fixture;
            const [, scoreBarCell] = debugElement.queryAll(
                By.css(".mat-column-date"),
            );

            expect(
                (scoreBarCell.nativeElement as HTMLElement).textContent,
            ).toBe(" 23-11-2024 00:00 ");
        });

        it("should correctly handle an empty array of items", () => {
            recentlyPlayedStateService.recentlyPlayedItemsLimited$ = of([]);
            fixture.componentRef.setInput(
                "viewType",
                RECENTLY_PLAYED_ROUTES.Default,
            );
            fixture.detectChanges();

            const { debugElement } = fixture;
            const scoreBarCell = debugElement.query(By.css("."));

            expect(scoreBarCell).toBeNull();
        });
    });

    describe("grouped view", () => {
        it("should correctly normalize the score", () => {
            recentlyPlayedStateService.recentlyPlayedItemsGrouped$ = of([
                {
                    ...mockRecentlyPlayedItemGrouped,
                    score: 1,
                    normalizedScore: 99,
                },
            ]);
            fixture.componentRef.setInput(
                "viewType",
                RECENTLY_PLAYED_ROUTES.Grouped,
            );
            fixture.detectChanges();

            const { debugElement } = fixture;
            const scoreBarCell = debugElement.query(By.css(".score__bar"));

            expect(
                (scoreBarCell.nativeElement as HTMLElement).style.width,
            ).toBe("99%");
        });

        it("should correctly handle an empty array of items", () => {
            recentlyPlayedStateService.recentlyPlayedItemsGrouped$ = of([]);
            fixture.componentRef.setInput(
                "viewType",
                RECENTLY_PLAYED_ROUTES.Grouped,
            );
            fixture.detectChanges();

            const { debugElement } = fixture;
            const scoreBarCell = debugElement.query(By.css(".score__bar"));

            expect(scoreBarCell).toBeNull();
        });
    });
});
