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
