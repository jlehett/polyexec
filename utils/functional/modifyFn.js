import reduce from 'lodash/reduce';
import map from 'lodash/map';
import callback from './callback';
import safeCall from './safeCall';

export default (fn, ...modifiers) => async (...args) => {
    try {
        map(modifiers, modifier => safeCall(modifier.onTry)());
        return await fn(...args);
    } catch (err) {
        map(modifiers, modifier => safeCall(modifier.onCatch)(err));
    } finally {
        map(modifiers, modifier => safeCall(modifier.onFinally)());
    }
}

export const onTry = (...fns) => map(fns, fn => ({ onTry: fn }));
export const onCatch = (...fns) => map(fns, fn => ({ onCatch: fn }));
export const onFinally = (...fns) => map(fns, fn => ({ onFinally: fn }));

export const setWhileRunning = (object, propPath, value) => ({
    onTry: callback(set, object, propPath, value),
    onFinally: callback(set, object, propPath, undefined)
});
