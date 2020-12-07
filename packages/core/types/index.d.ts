/**
 * Making the function to be FuncInstance
 * @param func {Function} the function to convert
 * @param options {Object=} the options for this giving
 * @param options.instanceType {Function=}  the class type of instance default to be FuncInstance
 * @return {FuncInstance | Function}
 */
export function give(func: Function, options?: any | undefined): FuncInstance | Function;
export * from "./classes/FuncInstance";
import { FuncInstance } from "./classes/FuncInstance";
