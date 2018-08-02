/**
 * String utility functions
 */

/** Capitalize the first letter of a string */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Split a string into words, handling camelCase, kebab-case, snake_case, and spaces */
export function words(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Convert a string to camelCase */
export function camelCase(str: string): string {
  const parts = words(str);
  if (parts.length === 0) return '';
  return (
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('')
  );
}

/** Convert a string to kebab-case */
export function kebabCase(str: string): string {
  return words(str)
    .map((w) => w.toLowerCase())
    .join('-');
}

/** Convert a string to snake_case */
export function snakeCase(str: string): string {
  return words(str)
    .map((w) => w.toLowerCase())
    .join('_');
}

/** Truncate a string to a max length, appending an ellipsis if truncated */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (maxLength < 0) throw new RangeError('maxLength must be non-negative');
  if (str.length <= maxLength) return str;
  const end = maxLength - suffix.length;
  if (end <= 0) return suffix.slice(0, maxLength);
  return str.slice(0, end) + suffix;
}

/** Convert a string to a URL-friendly slug */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric
    .trim()
    .replace(/[\s-]+/g, '-')         // collapse whitespace/hyphens
    .replace(/^-+|-+$/g, '');        // trim leading/trailing hyphens
}

/** Escape HTML special characters to prevent XSS */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (ch) => map[ch]);
}

/**
 * Simple template string interpolation.
 * Replaces `{{key}}` placeholders with values from the data object.
 *
 * @example
 * template('Hello {{name}}, you are {{age}}!', { name: 'Alice', age: 30 })
 * // => 'Hello Alice, you are 30!'
 */
export function template(str: string, data: Record<string, unknown>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key: string) => {
    if (key in data) {
      return String(data[key]);
    }
    return match; // leave unmatched placeholders intact
  });
}
