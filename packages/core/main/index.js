import {FuncInstance, assignPrototype} from "./classes/FuncInstance";

const defaultOptions = {
    instanceType: FuncInstance
};

export function FuncGiven(func, options) {
    options = {...defaultOptions, ...options};
    const resultFunc = function (...args) {
        return func.apply(this, args);
    };
    assignPrototype(resultFunc, options.instanceType);
    return resultFunc;
}