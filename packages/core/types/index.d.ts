/**
 * @param func {Function}
 * @param options {Object=}
 * @param options.instanceType {Function=}
 * @return {FuncInstance | Function}
 */
export function give(func: Function, options?: any | undefined): FuncInstance | Function;
export * from "./classes/FuncInstance";
import { FuncInstance } from "./classes/FuncInstance";
