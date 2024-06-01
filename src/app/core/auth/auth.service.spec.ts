import { HttpParams } from "@angular/common/http";
import {
    HttpClientTestingModule,
    HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthHTTPService } from "@api/auth-http.service";
import { TokenResponse } from "@dto/spotify";
import { environment } from "@env/environment";
import { AuthStateService } from "@state/auth.state.service";
import { firstValueFrom, Observable, of } from "rxjs";

import { AuthService } from "./auth.service";
import { LocalStorageService } from "./local-storage.service";

describe("AuthService", () => {
    let authService: AuthService;
    let localStorageService: LocalStorageService;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let authHTTPService: AuthHTTPService;
    let authStateService: AuthStateService;
    let httpTestingController: HttpTestingController;

    const mockTokenResponse: Observable<TokenResponse> = of({
        access_token: "access-token",
        token_type: "access_token",
        expires_in: 1000,
        refresh_token: "refresh-token",
        scope: "scope",
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {},
                        queryParams: of({
                            code: "test-code",
                            state: "test-state",
                        }),
                    },
                },
            ],
        });
        authService = TestBed.inject(AuthService);
        localStorageService = TestBed.inject(LocalStorageService);
        router = TestBed.inject(Router);
        router.navigateByUrl = jest.fn().mockReturnValue(Promise.resolve(true));
        activatedRoute = TestBed.inject(ActivatedRoute);
        authHTTPService = TestBed.inject(AuthHTTPService);
        authStateService = TestBed.inject(AuthStateService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should be created", () => {
        expect(authService).toBeTruthy();
    });

    describe("generateRandomString", () => {
        it("should generate a string of the specified length", () => {
            const length = 10;
            const result = authService.generateRandomString(length);
            expect(result.length).toBe(length);
        });

        it("should only contain valid characters", () => {
            const length = 100;
            const result = authService.generateRandomString(length);
            const possible =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (const char of result) {
                expect(possible.includes(char)).toBeTruthy();
            }
        });
    });

    describe("sha256$", () => {
        it("should return a SHA-256 hash of the input string", async () => {
            const plain = "test string";
            const hash = await firstValueFrom(authService.sha256$(plain));
            const expectedHash =
                "d5579c46dfcc7f18207013e65b44e4cb4e2c2298f4ac457ba8f82743f31e930b";
            const hashArray = new Uint8Array(hash);
            const hashHex = Array.from(hashArray)
                .map((byte) => byte.toString(16).padStart(2, "0"))
                .join("");
            expect(hashHex).toBe(expectedHash);
        });
    });

    describe("base64encode", () => {
        it("should return a base64 URL-safe encoded string for a given ArrayBuffer", () => {
            const inputString = "test string";
            const encoder = new TextEncoder();
            const inputBuffer = encoder.encode(inputString);
            const expectedOutput = "dGVzdCBzdHJpbmc";

            const result = authService.base64encode(inputBuffer);

            expect(result).toBe(expectedOutput);
        });
    });

    describe("redirectToAuthCodeFlow$", () => {
        it("should redirect to the correct URL with the correct parameters", async () => {
            jest.spyOn(authService, "generateRandomString").mockReturnValue(
                "random-string",
            );
            jest.spyOn(authService, "sha256$").mockReturnValue(
                of(new Uint8Array([1, 2, 3])),
            );
            jest.spyOn(authService, "base64encode").mockReturnValue(
                "encoded-string",
            );
            const localStorageSpy = jest.spyOn(Storage.prototype, "setItem");
            const windowLocationSpy = jest.spyOn(window, "location", "get");
            const mockLocation = { href: "" };
            windowLocationSpy.mockReturnValue(mockLocation as Location);

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .redirectToAuthCodeFlow$()
                    .subscribe(() => {
                        expect(
                            authService.generateRandomString,
                        ).toHaveBeenCalledTimes(2);
                        expect(authService.sha256$).toHaveBeenCalledTimes(2);
                        expect(authService.base64encode).toHaveBeenCalledTimes(
                            2,
                        );
                        expect(localStorageSpy).toHaveBeenCalledWith(
                            "__verifier",
                            "random-string",
                        );
                        expect(localStorageSpy).toHaveBeenCalledWith(
                            "__state",
                            "encoded-string",
                        );

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });
    });

    describe("handleAuthCallback$", () => {
        it("should obtain access token if state matches", async () => {
            jest.spyOn(localStorageService, "getItem").mockReturnValue(
                "test-state",
            );
            jest.spyOn(authService, "getAccessTokenWrapper$").mockReturnValue(
                of(true),
            );
            jest.spyOn(Storage.prototype, "removeItem");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handleAuthCallback$()
                    .subscribe((result) => {
                        expect(
                            localStorageService.getItem,
                        ).toHaveBeenCalledWith("state");
                        expect(
                            Storage.prototype.removeItem,
                        ).toHaveBeenCalledWith("__state");
                        expect(
                            authService.getAccessTokenWrapper$,
                        ).toHaveBeenCalledWith("test-code");
                        expect(result).toBe(true);

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should clear local storage and redirect if state does not match", async () => {
            jest.spyOn(localStorageService, "getItem").mockReturnValue(
                "different-state",
            );
            jest.spyOn(localStorageService, "clearLocalStorageItems");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handleAuthCallback$()
                    .subscribe(() => {
                        expect(
                            localStorageService.getItem,
                        ).toHaveBeenCalledWith("state");
                        expect(
                            localStorageService.clearLocalStorageItems,
                        ).toHaveBeenCalled();
                        expect(router.navigateByUrl).toHaveBeenCalledWith("");

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should clear local storage and redirect if code or state is missing", async () => {
            activatedRoute.queryParams = of({ code: null, state: null });
            jest.spyOn(localStorageService, "clearLocalStorageItems");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handleAuthCallback$()
                    .subscribe(() => {
                        expect(
                            localStorageService.clearLocalStorageItems,
                        ).toHaveBeenCalled();
                        expect(router.navigateByUrl).toHaveBeenCalledWith("");

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });
    });

    describe("getAccessTokenWrapper$", () => {
        it("should clear local storage and redirect if verifier is not found", async () => {
            jest.spyOn(localStorageService, "getItem").mockReturnValue(null);
            jest.spyOn(localStorageService, "clearLocalStorageItems");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .getAccessTokenWrapper$("test-code")
                    .subscribe(() => {
                        expect(authStateService.isUserAuthenticated).toBe(
                            false,
                        );
                        expect(
                            localStorageService.clearLocalStorageItems,
                        ).toHaveBeenCalled();
                        expect(router.navigateByUrl).toHaveBeenCalledWith("");

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should obtain access token if verifier is found", async () => {
            jest.spyOn(localStorageService, "getItem").mockReturnValue(
                "test-verifier",
            );
            jest.spyOn(localStorageService, "removeItem");
            jest.spyOn(authHTTPService, "getAccessToken$");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .getAccessTokenWrapper$("test-code")
                    .subscribe(() => {
                        expect(
                            authHTTPService.getAccessToken$,
                        ).toHaveBeenCalledWith("test-verifier", "test-code");
                        expect(
                            localStorageService.removeItem,
                        ).toHaveBeenCalledWith("verifier");
                        expect(router.navigateByUrl).toHaveBeenCalledWith(
                            "/top-tracks",
                        );

                        resolve();
                        subscription.unsubscribe();
                    });

                const req = httpTestingController.expectOne(
                    environment.tokenUrl,
                );
                expect(req.request.method).toBe("POST");
                expect(req.request.headers.get("Content-Type")).toBe(
                    "application/x-www-form-urlencoded",
                );

                const params = new HttpParams()
                    .set("client_id", environment.clientId)
                    .set("grant_type", "authorization_code")
                    .set("redirect_uri", environment.redirectUri)
                    .set("code", "test-code")
                    .set("code_verifier", "test-verifier");

                expect(req.request.body).toEqual(params);
                req.flush(mockTokenResponse);
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should handle error by clearing local storage and redirecting", async () => {
            jest.spyOn(localStorageService, "getItem").mockReturnValue(
                "test-verifier",
            );
            jest.spyOn(localStorageService, "clearLocalStorageItems");
            jest.spyOn(authHTTPService, "getAccessToken$");
            authStateService.isUserAuthenticated = true;

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .getAccessTokenWrapper$("test-code")
                    .subscribe({
                        complete: () => {
                            expect(authStateService.isUserAuthenticated).toBe(
                                false,
                            );
                            expect(
                                localStorageService.clearLocalStorageItems,
                            ).toHaveBeenCalled();
                            expect(router.navigateByUrl).toHaveBeenCalledWith(
                                "",
                            );

                            resolve();
                            subscription.unsubscribe();
                        },
                    });

                const req = httpTestingController.expectOne(
                    environment.tokenUrl,
                );
                req.flush("deliberate 404", {
                    status: 404,
                    statusText: "Not Found",
                });
            });

            await expect(promise).resolves.toBeUndefined();
        });
    });

    describe("handlePotentiallyExpiredAccessToken$", () => {
        it("should clear local storage and redirect if access token, refresh token, or expiry are missing", async () => {
            const mockLocalStorageService = jest.spyOn(
                localStorageService,
                "getItem",
            );
            mockLocalStorageService.mockReturnValueOnce(null);
            mockLocalStorageService.mockReturnValueOnce(null);
            mockLocalStorageService.mockReturnValueOnce(null);
            jest.spyOn(localStorageService, "clearLocalStorageItems");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handlePotentiallyExpiredAccessToken$()
                    .subscribe(() => {
                        expect(authStateService.isUserAuthenticated).toBe(
                            false,
                        );
                        expect(
                            localStorageService.clearLocalStorageItems,
                        ).toHaveBeenCalled();
                        expect(router.navigateByUrl).toHaveBeenCalledWith("");

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should refresh access token if expired", async () => {
            const expiredTime = (new Date().getTime() - 10000).toString();
            const mockLocalStorageService = jest.spyOn(
                localStorageService,
                "getItem",
            );
            mockLocalStorageService.mockReturnValueOnce("access-token");
            mockLocalStorageService.mockReturnValueOnce("refresh-token");
            mockLocalStorageService.mockReturnValueOnce(expiredTime);
            jest.spyOn(authHTTPService, "refreshAccessToken$");

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handlePotentiallyExpiredAccessToken$()
                    .subscribe((result) => {
                        expect(
                            authHTTPService.refreshAccessToken$,
                        ).toHaveBeenCalledWith("refresh-token");
                        expect(result).toBe(false);

                        resolve();
                        subscription.unsubscribe();
                    });

                const req = httpTestingController.expectOne(
                    environment.tokenUrl,
                );
                req.flush(mockTokenResponse);
            });

            await expect(promise).resolves.toBeUndefined();
        });

        it("should do nothing if access token is not expired", async () => {
            const futureTime = (new Date().getTime() + 10000).toString();
            const mockLocalStorageService = jest.spyOn(
                localStorageService,
                "getItem",
            );
            mockLocalStorageService.mockReturnValueOnce("access-token");
            mockLocalStorageService.mockReturnValueOnce("refresh-token");
            mockLocalStorageService.mockReturnValueOnce(futureTime);
            jest.spyOn(authHTTPService, "refreshAccessToken$").mockReturnValue(
                mockTokenResponse,
            );

            const promise = new Promise<void>((resolve) => {
                const subscription = authService
                    .handlePotentiallyExpiredAccessToken$()
                    .subscribe((result) => {
                        expect(
                            authHTTPService.refreshAccessToken$,
                        ).not.toHaveBeenCalled();
                        expect(result).toBe(false);

                        resolve();
                        subscription.unsubscribe();
                    });
            });

            await expect(promise).resolves.toBeUndefined();
        });
    });
});
