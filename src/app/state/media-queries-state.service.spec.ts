import { TestBed } from "@angular/core/testing";

import { MediaQueriesStateService } from "./media-queries-state.service";

describe("MediaQueriesStateService", () => {
    let service: MediaQueriesStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MediaQueriesStateService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
