import { describe, it, expect, vi } from 'vitest';
import { debounce, throttle, memoize, pipe, compose } from '../src/function';

describe('function utilities', () => {
  describe('debounce', () => {
    it('delays execution', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);
      debounced();
      debounced();
      debounced();
      expect(fn).not.toHaveBeenCalled();
      await new Promise((r) => setTimeout(r, 80));
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('throttle', () => {
    it('limits execution frequency', async () => {
      const fn = vi.fn();
      const throttled = throttle(fn, 50);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
      await new Promise((r) => setTimeout(r, 80));
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('memoize', () => {
    it('caches results', () => {
      let calls = 0;
      const expensive = memoize((n: number) => { calls++; return n * 2; });
      expect(expensive(5)).toBe(10);
      expect(expensive(5)).toBe(10);
      expect(calls).toBe(1);
    });
    it('uses different cache for different args', () => {
      let calls = 0;
      const fn = memoize((n: number) => { calls++; return n; });
      fn(1);
      fn(2);
      expect(calls).toBe(2);
    });
  });

  describe('pipe', () => {
    it('chains functions left to right', () => {
      const add1 = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const piped = pipe(add1, double);
      expect(piped(3)).toBe(8);
    });
  });

  describe('compose', () => {
    it('chains functions right to left', () => {
      const add1 = (n: number) => n + 1;
      const double = (n: number) => n * 2;
      const composed = compose(add1, double);
      expect(composed(3)).toBe(7);
    });
  });
});
