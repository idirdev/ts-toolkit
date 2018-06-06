export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  opts: { attempts?: number; delay?: number; backoff?: number } = {}
): Promise<T> {
  const { attempts = 3, delay: delayMs = 1000, backoff = 2 } = opts;
  let lastError: Error | undefined;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      if (i < attempts - 1) {
        await delay(delayMs * Math.pow(backoff, i));
      }
    }
  }

  throw lastError;
}

export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function pool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number
): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < tasks.length) {
      const index = nextIndex++;
      results[index] = await tasks[index]();
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

export async function settled<T>(
  promises: Promise<T>[]
): Promise<{ fulfilled: T[]; rejected: Error[] }> {
  const results = await Promise.allSettled(promises);
  const fulfilled: T[] = [];
  const rejected: Error[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') fulfilled.push(result.value);
    else rejected.push(result.reason);
  }

  return { fulfilled, rejected };
}
