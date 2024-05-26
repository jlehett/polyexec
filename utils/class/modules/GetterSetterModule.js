
export default {
    createGetterSetters: (propNameToInitValueMap) => {
        function createGetterSetter(initValue, propName) {
            this[`_${propName}`] = initValue;

            Object.defineProperty(
                this,
                propName,
                {
                    get: () => this[`_${propName}`],
                    set: (value) => this[`_${propName}`] = value,
                }
            );
        }

        map(propNameToInitValueMap, createGetterSetter);
    },
    setter: (propNameToNewValueMap) => {
        function updatePrivateProp(value, propName) {
            this[`_${propName}`] = value;
        }

        map(propNameToNewValueMap, updatePrivateProp);
    },
};
