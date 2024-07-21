import { ComponentFixture, TestBed } from "@angular/core/testing";
import { mockImage } from "@mocks/top-items.model.mock";

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
        fixture.componentRef.setInput("component", test);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
