
export default {
    initVars: (propNameToInitValueMap) => {
        function initVariable(initValue, propName) {
            this[propName] = initValue;
        }

        map(propNameToInitValueMap, initVariable);
    },
};
