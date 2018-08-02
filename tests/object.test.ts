import { describe, it, expect } from 'vitest';
import { pick, omit, deepClone, deepMerge, get, set } from '../src/object';

describe('object utilities', () => {
  describe('pick', () => {
    it('picks specified keys', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });
    it('ignores missing keys', () => {
      expect(pick({ a: 1 }, ['a', 'b'] as any)).toEqual({ a: 1 });
    });
  });

  describe('omit', () => {
    it('omits specified keys', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 });
    });
  });

  describe('deepClone', () => {
    it('creates deep copy of nested objects', () => {
      const original = { a: { b: { c: 1 } }, d: [1, 2] };
      const clone = deepClone(original);
      clone.a.b.c = 999;
      clone.d.push(3);
      expect(original.a.b.c).toBe(1);
      expect(original.d).toEqual([1, 2]);
    });
    it('handles dates', () => {
      const original = { date: new Date('2024-01-01') };
      const clone = deepClone(original);
      expect(clone.date).toEqual(original.date);
      expect(clone.date).not.toBe(original.date);
    });
  });

  describe('deepMerge', () => {
    it('deeply merges objects', () => {
      const a = { x: { y: 1 }, z: 2 };
      const b = { x: { w: 3 }, z: 4 };
      expect(deepMerge(a, b)).toEqual({ x: { y: 1, w: 3 }, z: 4 });
    });
    it('does not mutate source', () => {
      const a = { x: 1 };
      deepMerge(a, { x: 2 });
      expect(a.x).toBe(1);
    });
  });

  describe('get', () => {
    it('gets nested value by path', () => {
      expect(get({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42);
    });
    it('returns default for missing path', () => {
      expect(get({ a: 1 }, 'b.c', 'default')).toBe('default');
    });
  });

  describe('set', () => {
    it('sets nested value by path', () => {
      const obj = { a: { b: 1 } };
      const result = set(obj, 'a.b', 42);
      expect(result.a.b).toBe(42);
    });
  });
});
