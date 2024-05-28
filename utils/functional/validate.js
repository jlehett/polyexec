import map from 'lodash/map';
import throwIf from './throwIf.js';

export default validate = (...validations) => map(
    validations,
    (validation) => throwIf(validation.cond())(validation.notMetMsg)(true),
);