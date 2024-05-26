import map from 'lodash/map';
import assignInWith from 'lodash/assignInWith';
import bind from 'lodash/bind';

export default (object, ...sources) => {
    const bindProp = (_, srcValue) => bind(srcValue, object);
    const bindPropsFromSource = (source) => assignInWith(object, source, bindProp);
    map(sources, bindPropsFromSource);
};