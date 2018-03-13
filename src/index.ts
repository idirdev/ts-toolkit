/**
 * @idirdev/ts-toolkit
 * A comprehensive TypeScript utility library for everyday development.
 */

export {
  chunk,
  unique,
  flatten,
  groupBy,
  shuffle,
  partition,
  zip,
  difference,
  intersection,
} from './array';

export {
  capitalize,
  camelCase,
  kebabCase,
  snakeCase,
  truncate,
  slugify,
  escapeHtml,
  template,
} from './string';

export {
  deepClone,
  deepMerge,
  pick,
  omit,
  get,
  set,
  flattenObject,
  unflatten,
} from './object';

export {
  debounce,
  throttle,
  memoize,
  pipe,
  compose,
  retry,
  sleep,
} from './function';

export {
  isString,
  isNumber,
  isObject,
  isArray,
  isNullish,
  isDefined,
  isPromise,
  isFunction,
  isBoolean,
  isDate,
  isNonEmptyString,
  isPositiveNumber,
} from './type-guards';

export {
  formatDate,
  timeAgo,
  isToday,
  addDays,
  diffDays,
  startOfDay,
} from './date';
