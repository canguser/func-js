/**
 * Get all property from target object including it's prototype
 * @param obj{Object}     The object to get
 * @param stack{Array<*>=} Excluded object in children object
 * @return {Array<string|Symbol>}
 */
export function getAllProperty(obj, stack = [Object.prototype]) {
    if (stack.includes(obj) || obj == null) {
        return [];
    }
    const properties = Object.getOwnPropertyNames(obj).filter(property => property !== 'constructor');
    const prototype = Object.getPrototypeOf(obj);
    return [...new Set(properties.concat(getAllProperty(prototype, stack.concat([obj]))))]
}

const singleInstanceMap = new Map();

/**
 * Get the single instance form class type
 * @param classType The class type
 * @return {Object}
 */
export function getSingleInstance(classType) {
    if (!classType) {
        return null;
    }
    if (!singleInstanceMap.has(classType)) {
        singleInstanceMap.set(classType, new classType());
    }
    return singleInstanceMap.get(classType);
}

/**
 * Assign the target's prototype to the origin object
 * @param origin{Object}        The origin object
 * @param target{Object}        The target object
 * @param initMethod{string=}   The method name will be called from origin while assigned, default to be 'initAssign'
 * @return {*}                  The origin object assigned
 */
export function assignInstance(origin, target, initMethod = 'initAssign') {
    const prototype = Object.getPrototypeOf(target);
    Object.setPrototypeOf(origin, prototype);
    if (typeof prototype[initMethod] === 'function') {
        prototype[initMethod].call(origin, target);
    }
    return origin;
}

/**
 * Assign the target class prototype to the origin object
 * @param origin{Object}        The origin object
 * @param targetType{Function}  The target class object
 * @param initMethod{string=}   The method name will be called from origin while assigned, default to be 'initAssign'
 * @return {*}                  The origin object assigned
 */
export function assignPrototype(origin, targetType, initMethod = 'initAssign') {
    const prototype = targetType.prototype;
    Object.setPrototypeOf(origin, prototype);
    if (typeof prototype[initMethod] === 'function') {
        prototype[initMethod].call(origin);
    }
    return origin;
}