import { TestBed } from "@angular/core/testing";

import { AuthStateService } from "./auth.state.service";

describe("AuthStateService", () => {
    let authStateService: AuthStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        authStateService = TestBed.inject(AuthStateService);
    });

    it("should be created", () => {
        expect(authStateService).toBeTruthy();
    });

    it("should initialize isUserAuthenticated to false", () => {
        expect(authStateService.isUserAuthenticated).toBe(false);
    });

    it("should initialize isUserAuthorized to false", () => {
        expect(authStateService.isUserAuthorized).toBe(false);
    });

    it("should set and get isUserAuthenticated correctly", () => {
        authStateService.isUserAuthenticated = true;
        expect(authStateService.isUserAuthenticated).toBe(true);
        authStateService.isUserAuthenticated = false;
        expect(authStateService.isUserAuthenticated).toBe(false);
    });

    it("should set and get isUserAuthorized correctly", () => {
        authStateService.isUserAuthorized = true;
        expect(authStateService.isUserAuthorized).toBe(true);
        authStateService.isUserAuthorized = false;
        expect(authStateService.isUserAuthorized).toBe(false);
    });
});
