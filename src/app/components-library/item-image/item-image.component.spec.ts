import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { mockImage } from "@mocks/top-items.model.mock";
import { PLACEHOLDER_URL } from "@model/image.model";

import { ItemImageComponent } from "./item-image.component";

describe("ItemImageComponent", () => {
    let component: ItemImageComponent;
    let fixture: ComponentFixture<ItemImageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ItemImageComponent],
        });

        fixture = TestBed.createComponent(ItemImageComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput("image", mockImage);
        fixture.componentRef.setInput("alt", test);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    it("should set the placeholderUrl if there was an error during the loading of the original image", () => {
        const imageElement = fixture.debugElement.query(By.css("img"));

        imageElement.triggerEventHandler("error");
        fixture.detectChanges();

        expect((imageElement.nativeElement as HTMLImageElement).src).toBe(
            PLACEHOLDER_URL,
        );
    });
});
