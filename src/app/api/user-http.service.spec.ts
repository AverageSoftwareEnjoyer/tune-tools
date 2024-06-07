import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { UserHTTPService } from "./user-http.service";

describe("UserHTTPService", () => {
    let service: UserHTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(UserHTTPService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
