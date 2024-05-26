import isFunction from 'lodash/isFunction';

export default (conditionOrValue) => (errorMessage) => (value) => {
    switch (true) {
        case isFunction(conditionOrValue):
            if (conditionOrValue(value)) throw new Error(errorMessage);
        default:
            if (value === conditionOrValue) throw new Error(errorMessage);
    }
}