import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";

import { SidenavService } from "../sidenav.service";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let sidenavService: SidenavService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HeaderComponent,
                MatToolbarModule,
                MatButtonModule,
                MatIconModule,
                MatListModule,
                NoopAnimationsModule,
            ],
            providers: [{ provide: ActivatedRoute, useValue: {} }],
        });

        sidenavService = TestBed.inject(SidenavService);
        sidenavService.toggleSidenavPublish = jest.fn();
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        component.isBelowMediumWidth = true;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call toggleSidenav on button click", () => {
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css(".header__menu-btn"));
        button.triggerEventHandler("click", null);

        expect(sidenavService.toggleSidenavPublish).toHaveBeenCalled();
    });

    it("should display menu button for handset", () => {
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css(".header__menu-btn"));
        expect(button).not.toBeNull();
    });

    it("should not display menu button for non-handset", () => {
        component.isBelowMediumWidth = false;
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css(".header__menu-btn"));
        expect(button).toBeNull();
    });

    it("should display nav links for non-handset", () => {
        component.isBelowMediumWidth = false;
        fixture.detectChanges();

        const navLinks = fixture.debugElement.query(
            By.css(".header__nav-links"),
        );
        expect(navLinks).not.toBeNull();
    });

    it("should not display nav links for handset", () => {
        fixture.detectChanges();

        const navLinks = fixture.debugElement.query(
            By.css(".header__nav-links"),
        );
        expect(navLinks).toBeNull();
    });
});
