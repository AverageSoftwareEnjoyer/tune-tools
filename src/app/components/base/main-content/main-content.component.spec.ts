import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { Observable, Subject } from "rxjs";

import { SidenavService } from "../sidenav.service";
import { MainContentComponent } from "./main-content.component";

describe("MainContentComponent", () => {
    let component: MainContentComponent;
    let fixture: ComponentFixture<MainContentComponent>;
    let toggleSidenavSubject: Subject<void>;
    let mockSidenavService: {
        toggleSidenav$: Observable<void>;
    };
    let mockSidenav: Partial<MatSidenav>;

    beforeEach(() => {
        mockSidenav = { toggle: jest.fn() };

        toggleSidenavSubject = new Subject<void>();
        mockSidenavService = {
            toggleSidenav$: toggleSidenavSubject.asObservable(),
        };

        TestBed.configureTestingModule({
            imports: [
                MainContentComponent,
                NoopAnimationsModule,
                MatSidenavModule,
                RouterModule.forRoot([]),
            ],
            providers: [
                { provide: SidenavService, useValue: mockSidenavService },
            ],
        });

        fixture = TestBed.createComponent(MainContentComponent);
        component = fixture.componentInstance;

        component.sidenav = mockSidenav as MatSidenav;
        component.isHandset = true;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should toggle sidenav on sidenavService event", () => {
        toggleSidenavSubject.subscribe(() => {
            expect(mockSidenav.toggle).toHaveBeenCalledTimes(1);
        });

        toggleSidenavSubject.next();
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
