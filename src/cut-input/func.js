import {
  compose,
  is,
  join,
  length,
  map,
  mergeAll,
  prop,
  reduce,
  slice
} from 'rambda';

import {
  MAX_LENGTH,
  PATTERN,
  TRANSFORM,
  VALIDATOR
} from './constants';

export const defaultSizes = {
  [MAX_LENGTH]: Infinity,
  [PATTERN]: null,
  [TRANSFORM]: null,
  [VALIDATOR]: null
};

/**
 * Get input name by index
 * @param {number} i 
 */
export const getInputName = i => (`n${i}`);

/**
 * Defined size structure
 * @param {*} sizes
 * [
 *  {
 *    maxLength: null,
 *    pattern: null,
 *    transform: null,
 *    validator: null
 *  }
 * ]
 */
export const formatSizes = (sizes) => reduce(
  (acc, value) => {
    if (is(Number, value)) return [...acc, { ...defaultSizes, maxLength: value }];
    return [...acc, { ...defaultSizes, ...value }];
  },
  [],
  sizes
);

/**
 * Format state with default value
 * @param {array} sizes
 * {
 *  n0: '',
 *  n1: '',
 *  n2: ''
 * }
 */
export const formatDefaultValues = (sizes) => {
  let count = 0;
  return reduce((acc) => ({ ...acc, [getInputName(count++)]: '' }), {}, sizes);
};

/**
 * 
 * @param {object} item 
 * @param {string} defaultPattern 
 */
const formatRegexByItem = (item, defaultPattern, exactPattern) => prop(PATTERN, item)
  ? `(${prop(PATTERN, item)})`
  : `(${defaultPattern || '.'}{${prop(MAX_LENGTH, item)}})${!exactPattern ? '?' : ''}`;

/**
 * Format state with sizes values
 * @param {string} value
 * @param {array} sizes
 * @param {string} defaultPattern
 * {
 *  n0: 'ABCD',
 *  n1: '123',
 * }
 */
export const formatValues = (value, sizes, defaultPattern, exactPattern) => {
  const regex = compose(
    join(''),
    map(item => formatRegexByItem(item, defaultPattern, exactPattern))
  )(sizes);
  const matches = length(value) ? value.match(new RegExp(regex, 'i')) : null;
  if (!length(matches)) return {};
  return compose(
    mergeAll,
    d => d.map((match, i) => ({ [getInputName(i)]: match })),
    slice(1, Infinity)
  )(matches);
};