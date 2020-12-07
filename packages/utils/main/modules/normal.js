/**
 * Generate a strategy mapper
 * @param mapper{Object=}               The default mapper, key => value
 * @param defaultValue{*=}              If no property mapped, this value will return by default
 * @param ignoreCase{Boolean=} [false]  If set true, this result mapper will never check uppercase or lowercase
 * @return {{}}                         The return proxy value, will auto mapping the property as a strategy
 */
export function generateStrategyMapper(mapper = {}, defaultValue, ignoreCase = false) {
    return new Proxy({...mapper}, {
        get(target, p, receiver) {
            if (getOwnProperties(target)
                .map(property => ignoreCase && typeof property === 'string' ? property.toLowerCase() : property)
                .includes(ignoreCase && typeof p === 'string' ? p.toLowerCase() : p)) {
                return Reflect.get(target, p, receiver);
            }
            return defaultValue;
        }
    });
}

/**
 * Get all properties from target object, including Symbol type
 * @param target{Object} target object
 * @return {Array<string|Symbol>}
 */
export function getOwnProperties(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
}

/**
 * Get the hashcode from a string segment
 * @param str{string}   The string segment
 * @return {string}     The result hashcode as string type
 */
export function getStrHashCode(str) {
    str += '';
    let hash = 0, i, chr, len;
    if (str.length === 0) return hash + '';
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash + '';
}

/**
 * Get the hashcode from a object
 * @param obj{Object}                   The target object
 * @param stringify{Boolean=} [false]   Using `JSON.stringify` method to convert object to be string
 * @param deep{number=} [10]            How deeply to fetch the inner object of target object
 * @return {string}                     The result hashcode as string type
 */
export function getHashCode(obj, stringify = false, deep = 10) {
    if (stringify) {
        return getStrHashCode(JSON.stringify(obj));
    }
    return getStrHashCode(
        getKeyValues(obj, deep).join('')
    );
}

export function getKeyValues(obj, deep = 10) {
    if (deep <= 0) {
        return [];
    }
    if (!obj || ['string', 'number', 'boolean', 'function'].includes(typeof obj) || obj instanceof Date) {
        return [obj];
    }
    deep = deep - 1;

    return flat(
        Object.entries({...Array.isArray(obj) ? [...obj] : obj}).map(([key, value]) => [key, getKeyValues(value, deep)]), deep
    ).filter(r => r != null && r !== '');
}

/**
 * Flat array, see mdn: `Array.prototype.flat`, this is just using for lower than ES6 version
 * @param array{Array<*>}
 * @param deep{number=} [Infinity] the deeply length
 * @return {unknown[] | *}
 */
export function flat(array, deep = Infinity) {

    const flat = Array.prototype.flat || function (deep = Infinity) {
        if (deep < 1) {
            return this;
        }
        let result = [];
        const nextDeep = deep - 1;
        this.forEach(a => {
            if (a instanceof Array) {
                result = result.concat(flat.call(a, nextDeep));
            } else {
                result.push(a);
            }
        });
        return result;
    };

    return flat.call(array, deep);

}

/**
 * Get an unique id
 * @param length{number=} the id length
 * @return {string} the unique id
 */
export function genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

/**
 * Assign the origin's property to target object by property key.
 * @param target            The target object
 * @param origin            The origin object
 * @param key               The property key
 * @param defaultValue{*=}  If there's not existing value from origin object, the default
 */
export function assignProperty(target, origin, key, defaultValue) {
    if (origin && origin[key] !== undefined) {
        target[key] = origin[key];
    } else if (typeof defaultValue === 'function') {
        target[key] = defaultValue();
    }
}