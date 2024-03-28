import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSidenav } from "@angular/material/sidenav";
import { By } from "@angular/platform-browser";
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
            imports: [MainContentComponent],
            providers: [
                { provide: SidenavService, useValue: mockSidenavService },
            ],
        });

        fixture = TestBed.createComponent(MainContentComponent);
        component = fixture.componentInstance;

        component.sidenav = mockSidenav as MatSidenav;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should toggle sidenav on sidenavService event", () => {
        toggleSidenavSubject.subscribe(() => {
            expect(mockSidenav.toggle).toHaveBeenCalled();
        });

        toggleSidenavSubject.next();
    });

    it("should contain a router outlet", () => {
        fixture.detectChanges();

        const routerOutlet = fixture.debugElement.query(
            By.css("router-outlet"),
        );
        expect(routerOutlet).toBeTruthy();
    });
});
