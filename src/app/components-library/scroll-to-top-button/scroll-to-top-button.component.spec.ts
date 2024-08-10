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

    it("should call the scrolling method on button click and scroll directly to the top if the current scrollY level is below 5", () => {
        global.scrollTo = jest.fn();
        Object.defineProperty(global.window, "scrollY", { value: 1 });

        const button = fixture.debugElement.query(
            By.css(".scroll-to-top > button"),
        );
        button.triggerEventHandler("click", null);

        expect(global.scrollTo).toHaveBeenCalledTimes(1);
    });

    it("should call the scrolling method on button click and scroll incrementally to the top if the current scrollY level is greater than or equal to 5", () => {
        global.scrollTo = jest.fn();
        Object.defineProperty(global.window, "scrollY", { value: 100 });

        const button = fixture.debugElement.query(
            By.css(".scroll-to-top > button"),
        );
        button.triggerEventHandler("click", null);

        expect(global.scrollTo).toHaveBeenCalledTimes(1);
    });
});
