import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSidenavHarness } from "@angular/material/sidenav/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { MediaQueriesStateService } from "@state/media-queries-state.service";
import { Observable, Subject } from "rxjs";

import { routes } from "../../../app.routes";
import { SidenavService } from "../sidenav.service";
import { MainContentComponent } from "./main-content.component";

describe("MainContentComponent", () => {
    let component: MainContentComponent;
    let fixture: ComponentFixture<MainContentComponent>;
    let mediaQueriesStateService: MediaQueriesStateService;
    let toggleSidenavSubject: Subject<void>;
    let mockSidenavService: {
        toggleSidenav$: Observable<void>;
    };
    let loader: HarnessLoader;

    beforeEach(() => {
        toggleSidenavSubject = new Subject<void>();
        mockSidenavService = {
            toggleSidenav$: toggleSidenavSubject.asObservable(),
        };

        TestBed.configureTestingModule({
            imports: [
                MainContentComponent,
                NoopAnimationsModule,
                MatSidenavModule,
            ],
            providers: [
                provideRouter(routes),
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: SidenavService, useValue: mockSidenavService },
            ],
        });

        mediaQueriesStateService = TestBed.inject(MediaQueriesStateService);
        mediaQueriesStateService.isBelowMediumWidth = signal(true);
        fixture = TestBed.createComponent(MainContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loader = TestbedHarnessEnvironment.loader(fixture);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should toggle sidenav on sidenavService event", async () => {
        const harness = await loader.getHarness(MatSidenavHarness);
        expect(await harness.isOpen()).toBe(false);
        toggleSidenavSubject.next();
        expect(await harness.isOpen()).toBe(true);
    });

    it("should close sidenav on clicking a link", () => {
        component.sidenav.open();
        expect(component.sidenav.opened).toBe(true);

        const link = fixture.debugElement.query(
            By.css(".main-content__nav-link"),
        ).nativeElement as HTMLAnchorElement;
        expect(link).not.toBeNull();
        link.click();

        expect(component.sidenav.opened).toBe(false);
    });

    it("should contain a router outlet", () => {
        const routerOutlet = fixture.debugElement.query(
            By.css("router-outlet"),
        );
        expect(routerOutlet).toBeTruthy();
    });
});
