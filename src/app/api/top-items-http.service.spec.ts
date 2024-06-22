import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { TopItemsHTTPService } from "./top-items-http.service";

describe("TopItemsHTTPService", () => {
    let topItemsHTTPService: TopItemsHTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        topItemsHTTPService = TestBed.inject(TopItemsHTTPService);
    });

    it("should be created", () => {
        expect(topItemsHTTPService).toBeTruthy();
    });
});
