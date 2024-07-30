import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ScrollToTopButtonComponent } from "./scroll-to-top-button.component";

describe("ScrollToTopButtonComponent", () => {
    let component: ScrollToTopButtonComponent;
    let fixture: ComponentFixture<ScrollToTopButtonComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ScrollToTopButtonComponent, BrowserAnimationsModule],
        });

        fixture = TestBed.createComponent(ScrollToTopButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should call the scrolling method on button click", () => {
        global.scrollTo = jest.fn();
        Object.defineProperty(global.window, "scrollY", { value: 1 });

        const button = fixture.debugElement.query(
            By.css(".scroll-to-top > button"),
        );
        button.triggerEventHandler("click", null);

        expect(global.scrollTo).toHaveBeenCalledTimes(1);
    });
});
