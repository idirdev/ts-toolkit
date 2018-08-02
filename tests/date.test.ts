import { describe, it, expect } from 'vitest';
import { formatDate, timeAgo, isToday, addDays, diffDays, startOfDay } from '../src/date';

describe('date utilities', () => {
  const base = new Date('2024-06-15T12:30:00Z');

  describe('timeAgo', () => {
    it('formats seconds ago', () => {
      const now = new Date();
      const d = new Date(now.getTime() - 30000);
      expect(timeAgo(d, now)).toMatch(/seconds? ago/);
    });
    it('formats minutes ago', () => {
      const now = new Date();
      const d = new Date(now.getTime() - 300000);
      expect(timeAgo(d, now)).toMatch(/minutes? ago/);
    });
  });

  describe('startOfDay', () => {
    it('returns start of day', () => {
      const start = startOfDay(base);
      expect(start.getHours()).toBe(0);
      expect(start.getMinutes()).toBe(0);
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

  describe('diffDays', () => {
    it('calculates difference in days', () => {
      const a = new Date('2024-01-10');
      const b = new Date('2024-01-01');
      expect(diffDays(a, b)).toBe(9);
    });
  });

  describe('formatDate', () => {
    it('formats with default pattern', () => {
      expect(formatDate(new Date('2024-06-15'))).toBe('2024-06-15');
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true);
    });
    it('returns false for other dates', () => {
      expect(isToday(new Date('2020-01-01'))).toBe(false);
    });
  });
});
