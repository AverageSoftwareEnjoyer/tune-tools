import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { FooterComponent } from "./footer.component";

describe("FooterComponent", () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FooterComponent], // Import MatToolbarModule if you're using mat-toolbar in the template
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should display the current year", () => {
        const currentYear = new Date().getFullYear().toString();
        const footerText = fixture.debugElement.query(By.css(".footer__text"))
            .nativeElement as HTMLElement;
        expect(footerText.textContent).toContain(currentYear);
    });
});
