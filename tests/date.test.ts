import { describe, it, expect } from 'vitest';
import { formatRelative, startOf, endOf, addDays, diffInDays, isWeekend, isBetween } from '../src/date';

describe('date utilities', () => {
  const base = new Date('2024-06-15T12:30:00Z');

  describe('formatRelative', () => {
    it('formats seconds ago', () => {
      const d = new Date(Date.now() - 30000);
      expect(formatRelative(d)).toMatch(/seconds? ago/);
    });
    it('formats minutes ago', () => {
      const d = new Date(Date.now() - 300000);
      expect(formatRelative(d)).toMatch(/minutes? ago/);
    });
  });

  describe('startOf / endOf', () => {
    it('returns start of day', () => {
      const start = startOf(base, 'day');
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
    });
    it('returns end of day', () => {
      const end = endOf(base, 'day');
      expect(end.getHours()).toBe(23);
      expect(end.getMinutes()).toBe(59);
    });
  });

  describe('addDays', () => {
    it('adds positive days', () => {
      const result = addDays(base, 5);
      expect(result.getDate()).toBe(20);
    });
    it('handles negative days', () => {
      const result = addDays(base, -10);
      expect(result.getDate()).toBe(5);
    });
  });

  describe('diffInDays', () => {
    it('calculates difference in days', () => {
      const a = new Date('2024-01-01');
      const b = new Date('2024-01-10');
      expect(diffInDays(a, b)).toBe(9);
    });
  });

  describe('isWeekend', () => {
    it('detects saturday', () => {
      expect(isWeekend(new Date('2024-06-15'))).toBe(true);
    });
    it('detects weekday', () => {
      expect(isWeekend(new Date('2024-06-17'))).toBe(false);
    });
  });

  describe('isBetween', () => {
    it('checks date range', () => {
      const date = new Date('2024-06-15');
      const start = new Date('2024-06-01');
      const end = new Date('2024-06-30');
      expect(isBetween(date, start, end)).toBe(true);
    });
  });
});
