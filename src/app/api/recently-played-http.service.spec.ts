import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { RecentlyPlayedHTTPService } from "./recently-played-http.service";

describe("RecentlyPlayedHTTPService", () => {
    let service: RecentlyPlayedHTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(RecentlyPlayedHTTPService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
