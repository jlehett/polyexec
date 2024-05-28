import isFunction from 'lodash/isFunction';

export default (fnOrValue) => isFunction(fnOrValue) ? fnOrValue() : fnOrValue;
