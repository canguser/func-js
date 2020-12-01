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

export function getOwnProperties(target) {
    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
}

export function getStrHashCode(str) {
    str += '';
    let hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash + '';
}

export function getHashCode(obj, stringify = false, deep = 10) {
    if (stringify) {
        return getStrHashCode(JSON.stringify(obj));
    }
    return this.getStrHashCode(
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

export function genID(length) {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}