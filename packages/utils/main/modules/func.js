export function getAllProperty(obj, stack = [Object.prototype]) {
    if (stack.includes(obj) || obj == null) {
        return [];
    }
    const properties = Object.getOwnPropertyNames(obj);
    const prototype = Object.getPrototypeOf(obj);
    return [...new Set(properties.concat(getAllProperty(prototype, stack.concat([obj]))))]
}