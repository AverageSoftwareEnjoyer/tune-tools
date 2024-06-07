import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthHTTPService } from "./auth-http.service";

describe("AuthHTTPService", () => {
    let service: AuthHTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        service = TestBed.inject(AuthHTTPService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
