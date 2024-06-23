import { Injectable } from "@angular/core";
import { Key, KEYS } from "@model/local-storage.model";

@Injectable({
    providedIn: "root",
})
export class LocalStorageService {
    /**
     * Sets a string value in localStorage with a given key.
     *
     * @param key - The key under which the value is stored.
     * @param value - The string value to be stored.
     */
    setItem(key: Key, value: string): void {
        localStorage.setItem(`__${key}`, value);
    }

    /**
     * Retrieves a string value from localStorage by key.
     *
     * @param key - The key under which the value is stored.
     * @returns The string value if found, otherwise null.
     */
    getItem(key: Key): string | null {
        return localStorage.getItem(`__${key}`);
    }

    /**
     * Removes an item from localStorage by key.
     *
     * @param key - The key of the item to remove.
     */
    removeItem(key: Key): void {
        localStorage.removeItem(`__${key}`);
    }

    /**
     * Clears all specified keys from localStorage.
     * Iterates over a predefined list of keys and removes each one.
     */
    clearLocalStorageItems(): void {
        for (const key of KEYS) {
            this.removeItem(key);
        }
    }
}
