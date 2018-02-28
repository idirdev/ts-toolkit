/**
 * Date utility functions
 */

/**
 * Format a Date using a simple pattern string.
 * Supported tokens: YYYY, MM, DD, HH, mm, ss
 */
export function formatDate(date: Date, pattern: string = 'YYYY-MM-DD'): string {
  const tokens: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0'),
  };

  let result = pattern;
  for (const [token, value] of Object.entries(tokens)) {
    result = result.replace(token, value);
  }
  return result;
}

/**
 * Return a human-readable relative time string (e.g., "3 hours ago", "in 2 days").
 */
export function timeAgo(date: Date, now: Date = new Date()): string {
  const diffMs = now.getTime() - date.getTime();
  const absDiff = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let label: string;
  if (seconds < 5) {
    return 'just now';
  } else if (seconds < 60) {
    label = `${seconds} second${seconds !== 1 ? 's' : ''}`;
  } else if (minutes < 60) {
    label = `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (hours < 24) {
    label = `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (days < 7) {
    label = `${days} day${days !== 1 ? 's' : ''}`;
  } else if (weeks < 5) {
    label = `${weeks} week${weeks !== 1 ? 's' : ''}`;
  } else if (months < 12) {
    label = `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    label = `${years} year${years !== 1 ? 's' : ''}`;
  }

  return isFuture ? `in ${label}` : `${label} ago`;
}

/** Check if a date is today (in local timezone) */
export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/** Add (or subtract with negative) a number of days to a date. Returns a new Date. */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/** Calculate the difference in full days between two dates (a - b) */
export function diffDays(a: Date, b: Date): number {
  const msPerDay = 86_400_000;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcA - utcB) / msPerDay);
}

/** Return a new Date set to the start of day (00:00:00.000) in local timezone */
export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}
