import {
    HttpInterceptorFn,
    HttpRequest,
    HttpResponse,
} from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { environment } from "@env/environment";
import { of } from "rxjs";

import { authInterceptor } from "./auth.interceptor";
import { LocalStorageService } from "./local-storage.service";

describe("authInterceptor", () => {
    let localStorageService: LocalStorageService;

    const interceptor: HttpInterceptorFn = (req, next) =>
        TestBed.runInInjectionContext(() => authInterceptor(req, next));

    beforeEach(() => {
        TestBed.configureTestingModule({});

        localStorageService = TestBed.inject(LocalStorageService);
        jest.spyOn(localStorageService, "getItem").mockReturnValue(
            "mocked_token",
        );
    });

    it("should be created", () => {
        expect(interceptor).toBeTruthy();
    });

    it("should add authorization header for matching URL", async () => {
        const httpRequest = new HttpRequest(
            "GET",
            `${environment.apiBaseUrl}/test-endpoint`,
        );
        const httpHandler = jest.fn().mockReturnValue(of(new HttpResponse()));

        const promise = new Promise<void>((resolve) => {
            const subscription = interceptor(
                httpRequest,
                httpHandler,
            ).subscribe(() => {
                const request = (
                    httpHandler.mock.calls[0] as unknown[]
                )[0] as HttpRequest<null>;
                expect(request.headers.get("Authorization")).toBe(
                    "Bearer mocked_token",
                );

                resolve();
                subscription.unsubscribe();
            });
        });

        await expect(promise).resolves.toBeUndefined();
    });

    it("should not add authorization header for non-matching URL", async () => {
        const httpRequest = new HttpRequest(
            "GET",
            "https://anotherapi.com/test-endpoint",
        );
        const httpHandler = jest.fn().mockReturnValue(of(new HttpResponse()));

        const promise = new Promise<void>((resolve) => {
            const subscription = interceptor(
                httpRequest,
                httpHandler,
            ).subscribe(() => {
                expect(httpHandler).toHaveBeenCalledWith(httpRequest);

                resolve();
                subscription.unsubscribe();
            });
        });

        await expect(promise).resolves.toBeUndefined();
    });
});
