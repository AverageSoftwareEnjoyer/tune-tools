import { TestBed } from "@angular/core/testing";
import { Key, KEYS } from "@models/local-storage.model";

import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
    let localStorageService: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        localStorageService = TestBed.inject(LocalStorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set a string value in localStorage", () => {
        const key: Key = "verifier";
        const value = "testValue";
        const spy = jest.spyOn(Storage.prototype, "setItem");

        localStorageService.setItem(key, value);

        expect(spy).toHaveBeenCalledWith(`__${key}`, value);
    });

    it("should retrieve a string value from localStorage by key", () => {
        const key: Key = "token_expiry";
        const value = "testValue";
        jest.spyOn(Storage.prototype, "getItem").mockReturnValue(value);

        const result = localStorageService.getItem(key);

        expect(result).toBe(value);
        expect(localStorage.getItem).toHaveBeenCalledWith(`__${key}`);
    });

    it("should return null if key is not found in localStorage", () => {
        const key: Key = "state";
        jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

        const result = localStorageService.getItem(key);

        expect(result).toBeNull();
        expect(localStorage.getItem).toHaveBeenCalledWith(`__${key}`);
    });

    it("should remove an item from localStorage by key", () => {
        const key: Key = "refresh_token";
        const spy = jest.spyOn(Storage.prototype, "removeItem");

        localStorageService.removeItem(key);

        expect(spy).toHaveBeenCalledWith(`__${key}`);
    });

    it("should clear all specified keys from localStorage", () => {
        const spy = jest.spyOn(localStorageService, "removeItem");

        localStorageService.clearLocalStorageItems();

        KEYS.forEach((key) => {
            expect(spy).toHaveBeenCalledWith(key);
        });
    });
});
