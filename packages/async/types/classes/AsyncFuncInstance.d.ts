/**
 * *
 */
export type CacheType = string | Symbol;
export namespace CacheType {
    const LOCAL_STORAGE: symbol;
    const SESSION_STORAGE: symbol;
    const MEMORY: symbol;
    const CUSTOM: symbol;
}
/**
 * @class
 * @augments FuncInstance
 * @property asyncManager {AsyncManager} The asyncManger instance bind to this instance
 */
export class AsyncFuncInstance extends FuncInstance {
    constructor(...args: string[]);
    /**
     * Set the manager instance, it's helpful to using the methods without `asyncManager` param
     * @param manager {AsyncManager}    The async manager instance
     * @return {AsyncFuncInstance}      This function instance
     */
    setManager(manager: AsyncManager): AsyncFuncInstance;
    asyncManager: AsyncManager;
    /**
     * Sign the async method with identity,
     * to prevent the earlier results override the latest results in to async methods
     * @param local{string}                         This string is using to mark where the method called,
     *                                              two async methods with the same local will leads only one results
     * @param options{Object=}                      The options for sign method
     * @param options.identity{Function=}           A method to generate identity string while calling, default using `utils.genID` method
     * @param options.asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}            This function instance
     */
    sign(local?: string, { identity, asyncManager }?: any | undefined): FuncInstance | Function;
    /**
     * This method can hook target method's start, end callback, and registered to async manager.
     * While result method called, `METHOD_START`, `PROCESS_START` and more event could be called in its async manager instance
     * @param options{Object=}              The options for process method
     * @param options.start{Function=}      Before the target method called, the start method will be called without any params
     * @param options.end{Function=}        After the target method called, the start method will be called without any params
     * @param options.context{Function=}    The context for above methods
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    process({ start, end, context }?: any | undefined, asyncManager?: AsyncManager | undefined): FuncInstance | Function;
    /**
     * Using this method to cache async function's return value
     * @param options{Object=}              The options for cache method
     * @param options.type{CacheType=}      Specified the cache type to using with cache
     *                                      @see {@link CacheType}
     *                                      @see {@link MEMORY}
     * @param options.setter{Function=}     If cache type set custom, this method will be called to set cache
     * @param options.getter{Function=}     If cache type set custom, this method will be called to get cache
     * @param options.keyPrefix{string=}    The cache key's prefix
     * @param options.expire{number=}       Specified the expiration(ms) for the cache, default to be 5min
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    cache({ type, setter, getter, keyPrefix, expire }?: any | undefined, asyncManager?: AsyncManager | undefined): FuncInstance | Function;
    /**
     * Pre called this method and cache it's returning results for next calling.
     * @param args{Array<*>=}               The args as called params for method, and it will be identity for next calling.
     * @param options{Object=}              The options for pre method
     * @param options.timeout{number=}      Specified the timeout(ms) for this pre cache.
     * @param options.once{boolean=}        If set true, this pre cache will be removed once read it.
     * @param options.context{*=}           The context for target async method called.
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     */
    pre(args?: Array<any> | undefined, asyncManager?: AsyncManager | undefined, { timeout, once, context }?: number | undefined): Promise<any>;
    /**
     * Get the method to catch the pre loaded cache
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    preCache(asyncManager?: AsyncManager | undefined): FuncInstance | Function;
    /**
     * If method execute asynchronously, multi methods with same params will execute many times.
     * This method will prevent above, during the first method not finish,
     * all method with the same params and using the method will not execute, and when the first method finished,
     * the return value will be all waited methods' return value
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    multiplyMerge(asyncManager?: AsyncManager | undefined): FuncInstance | Function;
}
import { FuncInstance } from "@func-js/core/types/classes/FuncInstance";
import { AsyncManager } from "./AsyncManager";
