# 🧰 TS Toolkit

A comprehensive TypeScript utility library for everyday development. Zero dependencies, fully typed, tree-shakeable.

## Installation

```bash
npm install @idirdev/ts-toolkit
```

## Usage

```typescript
import { chunk, debounce, deepClone, capitalize, isString } from '@idirdev/ts-toolkit';

const chunks = chunk([1, 2, 3, 4, 5], 2); // [[1,2], [3,4], [5]]
const title = capitalize('hello world');    // 'Hello world'
```

## API Reference

### Array Utilities (`array.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `chunk` | `(arr, size) => T[][]` | Split array into chunks of given size |
| `unique` | `(arr, keyFn?) => T[]` | Deduplicate elements, optionally by key |
| `flatten` | `(arr, depth?) => T[]` | Recursively flatten nested arrays |
| `groupBy` | `(arr, keyFn) => Record<K, T[]>` | Group elements by key function |
| `shuffle` | `(arr) => T[]` | Fisher-Yates in-place shuffle |
| `partition` | `(arr, predicate) => [T[], T[]]` | Split into [pass, fail] groups |
| `zip` | `(...arrays) => tuple[]` | Zip arrays into tuples |
| `difference` | `(a, b) => T[]` | Elements in `a` not in `b` |
| `intersection` | `(a, b) => T[]` | Elements in both arrays |

### String Utilities (`string.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `capitalize` | `(str) => string` | Capitalize first letter |
| `camelCase` | `(str) => string` | Convert to camelCase |
| `kebabCase` | `(str) => string` | Convert to kebab-case |
| `snakeCase` | `(str) => string` | Convert to snake_case |
| `truncate` | `(str, max, suffix?) => string` | Truncate with ellipsis |
| `slugify` | `(str) => string` | URL-friendly slug |
| `escapeHtml` | `(str) => string` | Escape HTML entities |
| `template` | `(str, data) => string` | `{{key}}` interpolation |

### Object Utilities (`object.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `deepClone` | `(obj) => T` | Deep clone via structuredClone/JSON |
| `deepMerge` | `(target, source) => T` | Recursive deep merge |
| `pick` | `(obj, keys) => Partial<T>` | Pick specified keys |
| `omit` | `(obj, keys) => Partial<T>` | Omit specified keys |
| `get` | `(obj, path, default?) => T` | Get nested value by dot-path |
| `set` | `(obj, path, value) => T` | Set nested value by dot-path |
| `flattenObject` | `(obj) => Record` | Flatten to dot-separated keys |
| `unflatten` | `(obj) => Record` | Unflatten dot-separated keys |

### Function Utilities (`function.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `debounce` | `(fn, delay) => fn` | Debounce with cancel support |
| `throttle` | `(fn, interval) => fn` | Throttle with leading edge |
| `memoize` | `(fn, keyResolver?) => fn` | Cache results by arguments |
| `pipe` | `(...fns) => fn` | Left-to-right composition |
| `compose` | `(...fns) => fn` | Right-to-left composition |
| `retry` | `(fn, opts?) => Promise<T>` | Retry with exponential backoff |
| `sleep` | `(ms) => Promise<void>` | Async delay |

### Type Guards (`type-guards.ts`)

| Function | Returns true for |
|----------|-----------------|
| `isString` | `typeof === 'string'` |
| `isNumber` | `typeof === 'number'` (excludes NaN) |
| `isObject` | Plain objects only |
| `isArray` | `Array.isArray` |
| `isNullish` | `null` or `undefined` |
| `isDefined` | Not null and not undefined |
| `isPromise` | Promise or thenable |

### Date Utilities (`date.ts`)

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatDate` | `(date, pattern?) => string` | Format with YYYY/MM/DD/HH/mm/ss |
| `timeAgo` | `(date, now?) => string` | Human-readable relative time |
| `isToday` | `(date) => boolean` | Check if date is today |
| `addDays` | `(date, days) => Date` | Add/subtract days |
| `diffDays` | `(a, b) => number` | Difference in full days |
| `startOfDay` | `(date) => Date` | Set to 00:00:00.000 |

## License

MIT

## Contributing

Contributions welcome. Please open an issue first to discuss changes.

---

## 🇫🇷 Documentation en français

### Description
TS Toolkit est une bibliothèque utilitaire TypeScript complète pour le développement quotidien. Elle est conçue sans dépendances, entièrement typée et tree-shakeable, ce qui garantit des bundles légers. Elle regroupe un large éventail d'utilitaires pour les tableaux, les objets, les chaînes de caractères, les fonctions et bien plus encore.

### Installation
```bash
npm install @idirdev/ts-toolkit
```

### Utilisation
```typescript
import { groupBy, debounce, deepClone } from '@idirdev/ts-toolkit';
```
Consultez la documentation en anglais ci-dessus pour la référence complète de l'API et les exemples.
