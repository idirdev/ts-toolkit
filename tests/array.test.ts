import { describe, it, expect } from 'vitest';
import { chunk, unique, flatten, groupBy, partition, zip, shuffle, sample } from '../src/array';

describe('array utilities', () => {
  describe('chunk', () => {
    it('splits array into chunks of given size', () => {
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });
    it('returns empty array for empty input', () => {
      expect(chunk([], 3)).toEqual([]);
    });
    it('handles chunk size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('unique', () => {
    it('removes duplicate primitives', () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });
    it('uses key function when provided', () => {
      const items = [{ id: 1, name: 'a' }, { id: 1, name: 'b' }, { id: 2, name: 'c' }];
      expect(unique(items, (i) => i.id)).toHaveLength(2);
    });
  });

  describe('flatten', () => {
    it('flattens nested arrays', () => {
      expect(flatten([[1, 2], [3, [4, 5]]])).toEqual([1, 2, 3, 4, 5]);
    });
    it('handles already flat arrays', () => {
      expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('groupBy', () => {
    it('groups items by key function', () => {
      const items = [
        { type: 'fruit', name: 'apple' },
        { type: 'veggie', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
      ];
      const grouped = groupBy(items, (i) => i.type);
      expect(grouped.fruit).toHaveLength(2);
      expect(grouped.veggie).toHaveLength(1);
    });
  });

  describe('partition', () => {
    it('splits array by predicate', () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe('zip', () => {
    it('zips two arrays together', () => {
      expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
    });
    it('stops at shortest array', () => {
      expect(zip([1, 2], ['a'])).toEqual([[1, 'a']]);
    });
  });
});
