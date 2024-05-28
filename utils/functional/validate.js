import map from 'lodash/map';
import throwIf from './throwIf.js';

export default (...validations) => map(
    validations,
    validation => throwIf({ cond: !validation.cond, errMsg: validation.notMetMsg })
);