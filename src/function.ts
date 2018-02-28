/**
 * Function utility functions
 */

/**
 * Debounce a function: delays invocation until `delay` ms have passed
 * since the last call. Returns a debounced function with a `.cancel()` method.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): T & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: unknown[]) {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, delay);
  } as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}

/**
 * Throttle a function: ensures it is called at most once per `interval` ms.
 * Uses leading-edge invocation (fires immediately on first call).
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  interval: number
): T & { cancel: () => void } {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const throttled = function (this: unknown, ...args: unknown[]) {
    const now = Date.now();
    const remaining = interval - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn.apply(this, args);
    } else if (timeoutId === null) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn.apply(this, args);
      }, remaining);
    }
  } as T & { cancel: () => void };

  throttled.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    lastCall = 0;
  };

  return throttled;
}

/**
 * Memoize a function. Caches results keyed by the serialized arguments.
 * Optionally accepts a custom key resolver.
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyResolver?: (...args: Parameters<T>) => string
): T & { cache: Map<string, ReturnType<T>>; clear: () => void } {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: unknown, ...args: Parameters<T>): ReturnType<T> {
    const key = keyResolver ? keyResolver(...args) : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key)!;
    const result = fn.apply(this, args) as ReturnType<T>;
    cache.set(key, result);
    return result;
  } as T & { cache: Map<string, ReturnType<T>>; clear: () => void };

  memoized.cache = cache;
  memoized.clear = () => cache.clear();

  return memoized;
}

/**
 * Pipe functions left-to-right: pipe(f, g, h)(x) === h(g(f(x)))
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
}

/**
 * Compose functions right-to-left: compose(f, g, h)(x) === f(g(h(x)))
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

/**
 * Retry an async function up to `maxAttempts` times with exponential backoff.
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const { maxAttempts = 3, baseDelay = 1000, maxDelay = 30000, onRetry } = options;
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt === maxAttempts) break;
      const delay = Math.min(baseDelay * Math.pow(2, attempt - 1), maxDelay);
      onRetry?.(lastError, attempt);
      await sleep(delay);
    }
  }

  throw lastError;
}

/** Sleep for a given number of milliseconds */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
