/**
 * Array utility functions
 */

/** Split an array into chunks of a given size */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) throw new RangeError('Chunk size must be a positive integer');
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/** Return unique elements from an array, optionally by a key function */
export function unique<T>(arr: T[], keyFn?: (item: T) => unknown): T[] {
  if (!keyFn) return [...new Set(arr)];
  const seen = new Set<unknown>();
  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Recursively flatten a nested array to a given depth (default Infinity) */
export function flatten<T>(arr: unknown[], depth: number = Infinity): T[] {
  const result: unknown[] = [];
  const stack: Array<{ value: unknown; depth: number }> = arr
    .map((v) => ({ value: v, depth: 0 }))
    .reverse();

  while (stack.length > 0) {
    const { value, depth: currentDepth } = stack.pop()!;
    if (Array.isArray(value) && currentDepth < depth) {
      for (let i = value.length - 1; i >= 0; i--) {
        stack.push({ value: value[i], depth: currentDepth + 1 });
      }
    } else {
      result.push(value);
    }
  }
  return result as T[];
}

/** Group array elements by a key function */
export function groupBy<T, K extends string | number | symbol>(
  arr: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return arr.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}

/** Shuffle an array in place using Fisher-Yates algorithm. Returns the same array. */
export function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Partition an array into two groups based on a predicate: [truthy, falsy] */
export function partition<T>(
  arr: T[],
  predicate: (item: T, index: number) => boolean
): [T[], T[]] {
  const pass: T[] = [];
  const fail: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    (predicate(arr[i], i) ? pass : fail).push(arr[i]);
  }
  return [pass, fail];
}

/** Zip multiple arrays together, producing tuples. Stops at the shortest array. */
export function zip<T extends unknown[][]>(
  ...arrays: T
): Array<{ [K in keyof T]: T[K] extends (infer U)[] ? U : never }> {
  if (arrays.length === 0) return [];
  const minLen = Math.min(...arrays.map((a) => a.length));
  const result: any[] = [];
  for (let i = 0; i < minLen; i++) {
    result.push(arrays.map((a) => a[i]));
  }
  return result;
}

/** Return elements in `a` that are not in `b` */
export function difference<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return a.filter((item) => !setB.has(item));
}

/** Return elements present in both arrays */
export function intersection<T>(a: T[], b: T[]): T[] {
  const setB = new Set(b);
  return unique(a.filter((item) => setB.has(item)));
}
