import map from 'lodash/map';

export default (fn, ...modifiers) => async (...args) => {
    try {
        map(modifiers, modifier => modifier.onTry?.());
        return await fn(...args);
    } catch (err) {
        map(modifiers, modifier => modifier.onCatch?.(err));
    } finally {
        map(modifiers, modifier => modifier.onFinally?.());
    }
}

export const onTry = (...fns) => map(fns, fn => ({ onTry: fn }));
export const onCatch = (...fns) => map(fns, fn => ({ onCatch: fn }));
export const onFinally = (...fns) => map(fns, fn => ({ onFinally: fn }));

export const setWhileRunning = (object, propPath, value) => ({
    onTry: () => set(object, propPath, value),
    onFinally: () => set(object, propPath, undefined),
});
