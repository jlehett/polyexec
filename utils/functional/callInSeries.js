import isFunction from 'lodash/isFunction';
import throwIf from './throwIf.js';

export default async (...fns) => {
    for (const fn of fns) {
        throwIf(!isFunction)(`Expected a function but received ${typeof fn}.`)(fn);
        await fn();
    }
}
