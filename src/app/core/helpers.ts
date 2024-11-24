import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

/**
 * Checks if the provided value is a valid member of the specified enum-like object.
 * It returns a type guard function that can be used to check if a particular value is one of the
 * values in the enum-like object.
 *
 * @param enumObject - The enum-like object with string keys and values of any type.
 * @returns A function that takes a value of any type and returns `true` if the value is one of
 * the enum-like object's values, and `false` otherwise.
 */
export const isAnEnum =
    <T extends Record<string, unknown>>(enumObject: T) =>
    (maybeEnum: unknown): maybeEnum is T[keyof T] =>
        Object.values(enumObject).includes(maybeEnum as T[keyof T]);

/**
 * Creates a route guard function to validate a given URL parameter against a provided constant object or enum.
 * If the parameter is valid, navigation continues; otherwise, the user is redirected to the specified route.
 *
 * @template T - An object or enum with string values.
 * @param baseRoute - The base route to redirect to if the URL parameter is invalid.
 * @param enumToCheck - The object or enum to validate the URL parameter against.
 * @param paramName - The name of the URL parameter to check.
 * @param redirectRoute - The route to redirect the user to if validation fails.
 * @returns A route guard function that checks if the given URL parameter is valid. If valid, navigation proceeds;
 * otherwise, it redirects to the default route.
 */
export const routeParamGuard =
    <T extends Record<string, string>>(
        baseRoute: string,
        enumToCheck: T,
        paramName: string,
        redirectRoute: ValueOf<T>,
    ): CanActivateFn =>
    (route) => {
        if (isAnEnum(enumToCheck)(route.params[paramName])) {
            return true;
        }
        return inject(Router).parseUrl(`${baseRoute}/${redirectRoute}`);
    };

/**
 * Gets an element to be compared and returns `0` to maintain the order of key-value pairs received
 * from the KeyValuePipe.
 *
 * @returns `0` to maintain the order of key-value pairs.
 */
export const keepOrder = (): 0 => 0;

export type ValueOf<T> = T[keyof T];

/**
 * Normalizes a score based on the maximum score in an iterable of numbers.
 *
 * @param score - A score to normalize.
 * @param maxScore - The highest score in the iterable that is to be normalized.
 * @returns A normalized score.
 */
export const normalizeScore = (score: number, maxScore: number): number =>
    (99 - 10) * ((score - 1) / (maxScore - 1)) + 10;
