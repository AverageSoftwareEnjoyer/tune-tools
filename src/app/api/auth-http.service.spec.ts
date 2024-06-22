import { provideHttpClient } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { AuthHTTPService } from "./auth-http.service";

describe("AuthHTTPService", () => {
    let authHTTPService: AuthHTTPService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()],
        });
        authHTTPService = TestBed.inject(AuthHTTPService);
    });

    it("should be created", () => {
        expect(authHTTPService).toBeTruthy();
    });
});
