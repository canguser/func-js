import {FuncInstance} from "./classes/FuncInstance";
import {assignPrototype} from "@func-js/utils";

const defaultOptions = {
    instanceType: FuncInstance
};

/**
 * Making the function to be FuncInstance
 * @param func {Function} the function to convert
 * @param options {Object=} the options for this giving
 * @param options.instanceType {Function=}  the class type of instance default to be FuncInstance
 * @return {FuncInstance | Function}
 */
export function give(func, options) {
    options = {...defaultOptions, ...options};
    const resultFunc = function (...args) {
        return (func || (() => undefined)).apply(this, args);
    };
    assignPrototype(resultFunc, options.instanceType);
    return resultFunc;
}

export * from "./classes/FuncInstance";