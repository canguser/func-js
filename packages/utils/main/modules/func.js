export function getAllProperty(obj, stack = [Object.prototype]) {
    if (stack.includes(obj) || obj == null) {
        return [];
    }
    const properties = Object.getOwnPropertyNames(obj).filter(property => property !== 'constructor');
    const prototype = Object.getPrototypeOf(obj);
    return [...new Set(properties.concat(getAllProperty(prototype, stack.concat([obj]))))]
}

const singleInstanceMap = new Map();

export function getSingleInstance(classType) {
    if (!classType) {
        return null;
    }
    if (!singleInstanceMap.has(classType)) {
        singleInstanceMap.set(classType, new classType());
    }
    return singleInstanceMap.get(classType);
}

export function assignInstance(origin, target, initMethod = 'initAssign') {
    const prototype = Object.getPrototypeOf(target);
    Object.setPrototypeOf(origin, prototype);
    if (typeof prototype[initMethod] === 'function') {
        prototype[initMethod].call(origin, target);
    }
    return origin;
}

export function assignPrototype(origin, targetType, initMethod = 'initAssign') {
    const prototype = targetType.prototype;
    Object.setPrototypeOf(origin, prototype);
    if (typeof prototype[initMethod] === 'function') {
        prototype[initMethod].call(origin);
    }
    return origin;
}