import { TestBed } from "@angular/core/testing";
import { Key, KEYS } from "@models/local-storage.model";

import { LocalStorageService } from "./local-storage.service";

describe("LocalStorageService", () => {
    let service: LocalStorageService;

    beforeAll(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(),
                setItem: jest.fn(),
                clear: jest.fn(),
                removeItem: jest.fn(),
                length: 0,
                key: jest.fn(),
            },
        });
    });

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should set a string value in localStorage", () => {
        const key: Key = "verifier";
        const value = "testValue";
        const spy = jest.spyOn(localStorage, "setItem");

        service.setItem(key, value);

        expect(spy).toHaveBeenCalledWith(`__${key}`, value);
    });

    it("should retrieve a string value from localStorage by key", () => {
        const key: Key = "token_expiry";
        const value = "testValue";
        jest.spyOn(localStorage, "getItem").mockReturnValue(value);

        const result = service.getItem(key);

        expect(result).toBe(value);
        expect(localStorage.getItem).toHaveBeenCalledWith(`__${key}`);
    });

    it("should return null if key is not found in localStorage", () => {
        const key: Key = "state";
        jest.spyOn(localStorage, "getItem").mockReturnValue(null);

        const result = service.getItem(key);

        expect(result).toBeNull();
        expect(localStorage.getItem).toHaveBeenCalledWith(`__${key}`);
    });

    it("should remove an item from localStorage by key", () => {
        const key: Key = "refresh_token";
        const spy = jest.spyOn(localStorage, "removeItem");

        service.removeItem(key);

        expect(spy).toHaveBeenCalledWith(`__${key}`);
    });

    it("should clear all specified keys from localStorage", () => {
        const spy = jest.spyOn(service, "removeItem");

        service.clearLocalStorageItems();

        KEYS.forEach((key) => {
            expect(spy).toHaveBeenCalledWith(key);
        });
    });
});
