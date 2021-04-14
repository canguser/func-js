import {FuncInstance} from "./classes/FuncInstance";
import {assignPrototype} from "@func-js/utils";

const defaultOptions = {
    instanceType: FuncInstance
};

const definedOptions = {
    extends: FuncInstance
};

/**
 * Making the function to be FuncInstance
 * @param func {Function}                   The function to convert
 * @param options {Object=}                 The options for this giving
 * @param options.instanceType {Function=}  The class type of instance default to be FuncInstance
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

/**
 * Defined the custom methods for {@link FuncInstance} and return the instance type with the custom methods.
 * @param methods{Object}               The methods mapper for custom methods.
 * @param options{Object=}              The options for define method.
 * @param options.extends{Function=}    The instance type extends from {@link FuncInstance}, the origin methods can be kept.
 * @return {Function} The result instance type could be used.
 */
export function define(methods = {}, options) {
    options = {...definedOptions, ...options};

    class DefinedFuncInstance extends options.extends {
    }

    Object.assign(DefinedFuncInstance.prototype, methods);
    return DefinedFuncInstance;
}

/**
 * Call this function to make `given` function mount Function's prototype
 * @param options {string=}                 Options for `mountGlobal` method
 * @param options.name {string=}            The mount method's name
 * @param options.defaultOptions {Object=}  Options same as `give` method
 */
export function mountGlobal(options) {
    const {name = 'given', defaultOptions: dfOptions = defaultOptions} = options;
    Function.prototype[name] = function (options) {
        return give(this, {...dfOptions, ...options})
    }
}

export * from "./classes/FuncInstance";