/**
 * TypeScript type guard utility functions
 */

/** Check if a value is a string */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/** Check if a value is a number (excludes NaN) */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

/** Check if a value is a plain object (not null, not array, not Date, etc.) */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

/** Check if a value is an array */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/** Check if a value is null or undefined */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/** Check if a value is defined (not null and not undefined) */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/** Check if a value is a Promise (thenable) */
export function isPromise(value: unknown): value is Promise<unknown> {
  return (
    value instanceof Promise ||
    (typeof value === 'object' &&
      value !== null &&
      typeof (value as { then?: unknown }).then === 'function' &&
      typeof (value as { catch?: unknown }).catch === 'function')
  );
}

/** Check if a value is a function */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/** Check if a value is a boolean */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/** Check if a value is a Date object and is valid */
export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

/** Check if a value is a non-empty string */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}

/** Check if a value is a positive number */
export function isPositiveNumber(value: unknown): value is number {
  return isNumber(value) && value > 0;
}
