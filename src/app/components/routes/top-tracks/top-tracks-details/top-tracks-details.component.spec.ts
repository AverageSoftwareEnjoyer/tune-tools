import { ComponentFixture, TestBed } from "@angular/core/testing";
import { mockTopTrackLimited } from "@mocks/top-items.model.mock";

import { TopTracksDetailsComponent } from "./top-tracks-details.component";

describe("TopTracksDetailsComponent", () => {
    let component: TopTracksDetailsComponent;
    let fixture: ComponentFixture<TopTracksDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TopTracksDetailsComponent],
        });

        fixture = TestBed.createComponent(TopTracksDetailsComponent);
        component = fixture.componentInstance;
        component.track = mockTopTrackLimited;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
