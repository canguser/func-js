import {FuncInstance} from "./classes/FuncInstance";
import {assignPrototype} from "@func-js/utils";

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

export * from "./classes/FuncInstance";