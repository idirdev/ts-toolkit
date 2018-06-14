import { describe, it, expect, vi } from 'vitest';
import { delay, retry, timeout, pool, deferred, settled } from '../src/promise';

describe('promise utilities', () => {
  describe('delay', () => {
    it('resolves after specified time', async () => {
      const start = Date.now();
      await delay(50);
      expect(Date.now() - start).toBeGreaterThanOrEqual(40);
    });
  });

  describe('retry', () => {
    it('retries on failure', async () => {
      let calls = 0;
      const fn = async () => {
        calls++;
        if (calls < 3) throw new Error('fail');
        return 'ok';
      };
      const result = await retry(fn, { attempts: 3, delay: 10 });
      expect(result).toBe('ok');
      expect(calls).toBe(3);
    });

    it('throws after max attempts', async () => {
      const fn = async () => { throw new Error('always fails'); };
      await expect(retry(fn, { attempts: 2, delay: 10 })).rejects.toThrow('always fails');
    });
  });

  describe('timeout', () => {
    it('resolves if fast enough', async () => {
      const result = await timeout(Promise.resolve(42), 1000);
      expect(result).toBe(42);
    });

    it('rejects if too slow', async () => {
      const slow = new Promise((r) => setTimeout(() => r('late'), 500));
      await expect(timeout(slow, 10)).rejects.toThrow('Timeout');
    });
  });

  describe('pool', () => {
    it('runs tasks with concurrency limit', async () => {
      let running = 0;
      let maxRunning = 0;
      const tasks = Array.from({ length: 6 }, () => async () => {
        running++;
        maxRunning = Math.max(maxRunning, running);
        await delay(20);
        running--;
        return maxRunning;
      });
      const results = await pool(tasks, 2);
      expect(results).toHaveLength(6);
      expect(maxRunning).toBeLessThanOrEqual(2);
    });
  });

  describe('deferred', () => {
    it('creates externally resolvable promise', async () => {
      const d = deferred<number>();
      setTimeout(() => d.resolve(42), 10);
      expect(await d.promise).toBe(42);
    });
  });

  describe('settled', () => {
    it('separates fulfilled and rejected', async () => {
      const result = await settled([
        Promise.resolve(1),
        Promise.reject(new Error('oops')),
        Promise.resolve(3),
      ]);
      expect(result.fulfilled).toEqual([1, 3]);
      expect(result.rejected).toHaveLength(1);
    });
  });
});
