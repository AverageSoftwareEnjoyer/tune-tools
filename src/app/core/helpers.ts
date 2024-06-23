import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { TimeRangeOptions, TopItemsRoutes } from "@model/top-items.model";

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
 * Creates a route guard function to validate `timeRange` parameters against the `TimeRangeOptions`
 * enum.
 * If the `timeRange` parameter is valid, the navigation proceeds; otherwise, it redirects to a
 * default route.
 *
 * @param baseRoute - The base route to which the user should be redirected if `timeRange` is
 * invalid.
 * @returns A route guard function that checks the validity of the `timeRange` route parameter.
 */
export const timeRangeGuard =
    (baseRoute: TopItemsRoutes): CanActivateFn =>
    (route) => {
        if (isAnEnum(TimeRangeOptions)(route.params["timeRange"])) {
            return true;
        }
        return inject(Router).parseUrl(
            `${baseRoute}/${TimeRangeOptions.ShortTerm}`,
        );
    };
