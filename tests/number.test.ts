import { describe, it, expect } from 'vitest';
import { clamp, lerp, inverseLerp, roundTo, inRange, sum, average, median, percentile } from '../src/number';

describe('number utilities', () => {
  describe('clamp', () => {
    it('clamps value within range', () => {
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(5, 0, 10)).toBe(5);
    });
  });

  describe('lerp', () => {
    it('interpolates between values', () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
      expect(lerp(0, 100, 0)).toBe(0);
      expect(lerp(0, 100, 1)).toBe(100);
    });
    it('clamps t to 0-1', () => {
      expect(lerp(0, 100, 1.5)).toBe(100);
    });
  });

  describe('inverseLerp', () => {
    it('returns normalized position', () => {
      expect(inverseLerp(0, 100, 50)).toBe(0.5);
      expect(inverseLerp(0, 100, 0)).toBe(0);
    });
    it('returns 0 when start equals end', () => {
      expect(inverseLerp(5, 5, 5)).toBe(0);
    });
  });

  describe('roundTo', () => {
    it('rounds to specified decimals', () => {
      expect(roundTo(3.14159, 2)).toBe(3.14);
      expect(roundTo(3.145, 2)).toBe(3.15);
    });
  });

  describe('inRange', () => {
    it('checks if value is in range', () => {
      expect(inRange(5, 0, 10)).toBe(true);
      expect(inRange(15, 0, 10)).toBe(false);
    });
  });

  describe('statistics', () => {
    it('calculates sum', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
    });
    it('calculates average', () => {
      expect(average([2, 4, 6])).toBe(4);
      expect(average([])).toBe(0);
    });
    it('calculates median', () => {
      expect(median([1, 3, 5])).toBe(3);
      expect(median([1, 2, 3, 4])).toBe(2.5);
    });
    it('calculates percentile', () => {
      expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 50)).toBe(5.5);
      expect(percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 90)).toBe(9.1);
    });
  });
});
