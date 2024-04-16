import { BreakpointObserver } from "@angular/cdk/layout";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { firstValueFrom, of } from "rxjs";

import { AppComponent } from "./app.component";

describe("AppComponent", () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;
    const breakpointObserverMock = {
        observe: jest.fn().mockReturnValue(of({ matches: true })),
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppComponent,
                NoopAnimationsModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: BreakpointObserver,
                    useValue: breakpointObserverMock,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                    },
                },
            ],
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it("should create the AppComponent", () => {
        expect(component).toBeTruthy();
    });

    it("should set isBelowMediumWidth$ based on BreakpointObserver", async () => {
        fixture.detectChanges();

        const isBelowMediumWidth = await firstValueFrom(
            component["isBelowMediumWidth$"],
        );

        expect(isBelowMediumWidth).toBe(true);
    });
});
