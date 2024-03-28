import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { MainContentComponent } from "./main-content.component";

describe("MainContentComponent", () => {
    let component: MainContentComponent;
    let fixture: ComponentFixture<MainContentComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MainContentComponent],
        });

        fixture = TestBed.createComponent(MainContentComponent);
        component = fixture.componentInstance;
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should contain a router outlet", () => {
        fixture.detectChanges();

        const routerOutlet = fixture.debugElement.query(
            By.css("router-outlet"),
        );
        expect(routerOutlet).toBeTruthy();
    });
});
