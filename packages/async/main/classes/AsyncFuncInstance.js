import {FuncInstance, give} from "@func-js/core";
import {AsyncManager} from "./AsyncManager";
import {METHOD_END, METHOD_START} from "../constants/EventConstants";
import {assignProperty, generateStrategyMapper, genID, getHashCode} from "@func-js/utils";

/**
 * Enum for cache-type values.
 * @readonly
 * @enum {Symbol|string}
 * @property LOCAL_STORAGE
 * @property SESSION_STORAGE
 * @property MEMORY
 * @property CUSTOM
 */
export const CacheType = {
    LOCAL_STORAGE: Symbol('LOCAL_STORAGE'),
    SESSION_STORAGE: Symbol('SESSION_STORAGE'),
    MEMORY: Symbol('MEMORY'),
    CUSTOM: Symbol('CUSTOM')
};

const globalMemoryStorage = {};
const globalExistedSignMapper = {};

/**
 * @class
 * @augments FuncInstance
 * @property asyncManager {AsyncManager} The asyncManger instance bind to this instance
 */
export class AsyncFuncInstance extends FuncInstance {

    /**
     * @private
     * @param target{FuncInstance}
     */
    initAssign(target) {
        super.initAssign(target);
        assignProperty(this, target, 'asyncManager', () => undefined);
    }

    /**
     * Set the manager instance, it's helpful to using the methods without `asyncManager` param
     * @param manager {AsyncManager}    The async manager instance
     * @return {AsyncFuncInstance}      This function instance
     */
    setManager(manager) {
        if (manager && manager instanceof AsyncManager) {
            this.asyncManager = manager;
        }
        return this;
    }

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
    sign(local = '', {identity = genID, asyncManager} = {}) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;

        const getExistedSignMapper = () => {
            let signMapper;
            if (asyncManager && asyncManager instanceof AsyncManager) {
                signMapper = asyncManager.getExistedSignMapper();
            }
            if (!signMapper) {
                signMapper = globalExistedSignMapper;
            }
            return signMapper;
        };

        const signKey = local + this.uniqueId;
        const signMapper = getExistedSignMapper();

        return this.surround(
            {
                before: ({trans}) => {
                    let {keptIdentity} = trans;
                    if (keptIdentity === undefined) {
                        const signInfo = signMapper[signKey] || {};
                        signInfo.identity = keptIdentity = identity();
                        signMapper[signKey] = signInfo;
                        trans.keptIdentity = keptIdentity;
                    }
                },
                after: ({trans, lastValue: returnValue}) => {
                    const signInfo = signMapper[signKey] || {};
                    let {keptIdentity} = trans;
                    if (signInfo.identity === keptIdentity || keptIdentity === undefined) {
                        if (keptIdentity) {
                            delete trans.keptIdentity;
                        }
                        return returnValue;
                    }
                    console.warn('An async method be override by the different identity');
                    return null;
                },
                adaptAsync: true
            }
        );
    }

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
    process(
        {
            start = undefined,
            end = undefined,
            context = undefined
        } = {},
        asyncManager
    ) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;
        if (asyncManager && asyncManager instanceof AsyncManager) {
            start = give(start).before(() => {
                asyncManager.emit(METHOD_START)
            });
            end = give(end).after(({lastValue: returnValue}) => {
                asyncManager.emit(METHOD_END);
                return returnValue;
            }, true);
        }

        return this.surround({
            before: () => start.call(context || this),
            after: ({lastValue: returnValue}) => {
                end.call(context || this);
                return returnValue;
            },
            adaptAsync: true
        });
    }

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
    cache(
        {
            type = CacheType.MEMORY,
            setter = (key, value) => undefined,
            getter = (key) => undefined,
            keyPrefix = '_cache_func_',
            expire = 1000 * 60 * 5
        } = {},
        asyncManager
    ) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;
        const getMemoryStorage = () => {
            let storage;
            if (asyncManager && asyncManager instanceof AsyncManager) {
                storage = asyncManager.getMemoryStorage();
            }
            if (!storage) {
                storage = globalMemoryStorage;
            }
            return storage;
        };

        const memoryTypeDoing = () => {
            const storage = getMemoryStorage();
            setter = (key, value) => {
                storage[key] = value;
            };
            getter = key => storage[key];
        };

        const typeStrategyMapper = generateStrategyMapper({
            [CacheType.MEMORY]: memoryTypeDoing,
            [CacheType.LOCAL_STORAGE]: () => {
            },
            [CacheType.SESSION_STORAGE]: () => {
            },
            [CacheType.CUSTOM]: () => {
            },
        }, memoryTypeDoing);

        typeStrategyMapper[type]();

        return this.surround({
            before: (
                {
                    preventDefault,
                    trans, args
                }
            ) => {
                const argsHashcode = getHashCode(args);
                const key = keyPrefix + this.uniqueId + argsHashcode;
                const cachedValue = getter(key);
                if (cachedValue && cachedValue.timestamp <= Date.now() + expire) {
                    preventDefault();
                    const {data, isAsync = false} = cachedValue;
                    trans.isCached = true;
                    return isAsync ? Promise.resolve(data) : data;
                }
            },
            after: ({trans, args, lastValue: returnValue}) => {
                if (!trans.isCached) {
                    const argsHashcode = getHashCode(args);
                    const key = keyPrefix + this.uniqueId + argsHashcode;
                    if (returnValue instanceof Promise) {
                        return returnValue.then(result => {
                            setter(key, {
                                data: result,
                                timestamp: Date.now(),
                                isAsync: true
                            });
                            return result;
                        });
                    }
                    setter(key, {
                        data: returnValue,
                        timestamp: Date.now()
                    })
                }
                return returnValue;
            },
            adaptAsync: false
        });
    }

    /**
     * Pre called this method and cache it's returning results for next calling.
     * @param args{Array<*>=}               The args as called params for method, and it will be identity for next calling.
     * @param options{Object=}              The options for pre method
     * @param options.timeout{number=}      Specified the timeout(ms) for this pre cache.
     * @param options.once{boolean=}        If set true, this pre cache will be removed once read it.
     * @param options.context{*=}           The context for target async method called.
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     */
    pre(
        args = [],
        asyncManager,
        {
            timeout = 360000 * 5, // default 5 min
            once = false,
            context
        } = {}
    ) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;
        const argsHashcode = getHashCode(args);
        const storage = asyncManager.getPreCacheStorage(this.uniqueId);
        const cachedInfo = storage[argsHashcode] || {};
        return Promise.resolve(this.apply(context, args))
            .then(data => {
                cachedInfo.timestamp = Date.now();
                cachedInfo.data = data;
                cachedInfo.timeout = timeout;
                cachedInfo.once = once;
                storage[argsHashcode] = cachedInfo;
                return data;
            });
    }

    /**
     * Get the method to catch the pre loaded cache
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    preCache(
        asyncManager
    ) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;
        return this.before(({args = [], preventDefault}) => {
            const argsHashcode = getHashCode(args);
            const storage = asyncManager.getPreCacheStorage(this.uniqueId);
            const cacheInfo = storage[argsHashcode];
            const {data, timestamp, timeout, once} = cacheInfo || {};
            if (cacheInfo && timestamp + timeout >= Date.now()) {
                preventDefault();
                if (once) {
                    delete storage[argsHashcode];
                }
                return data;
            }
        });
    }

    /**
     * If method execute asynchronously, multi methods with same params will execute many times.
     * This method will prevent above, during the first method not finish,
     * all method with the same params and using the method will not execute, and when the first method finished,
     * the return value will be all waited methods' return value
     * @param asyncManager{AsyncManager=}   Specified the async manager instance, default to using the params of `setManager` called
     * @return {FuncInstance | Function}    This function instance
     */
    multiplyMerge(asyncManager) {
        asyncManager = asyncManager ? asyncManager : this.asyncManager;

        const {multiplyMergeHeap = {}} = asyncManager.managedData;
        asyncManager.managedData.multiplyMergeHeap = multiplyMergeHeap;

        const _this = this;

        return this.surround(
            {
                before({args, preventDefault, trans}) {
                    const identity = _this.uniqueId + getHashCode(args);
                    let targetHeap = multiplyMergeHeap[identity] || {callbacks: []};
                    if (!targetHeap.isExecuting) {
                        targetHeap = {
                            isExecuting: true,
                            callbacks: []
                        };
                        multiplyMergeHeap[identity] = targetHeap;
                        trans.targetHeap = multiplyMergeHeap[identity];
                    } else {
                        preventDefault();
                        return new Promise((resolve, reject) => {
                            targetHeap.callbacks.push(({returnValue, isError, error}) => {
                                if (!isError) {
                                    resolve(returnValue);
                                } else {
                                    reject(error);
                                }
                            });
                            multiplyMergeHeap[identity] = targetHeap;
                            trans.targetHeap = multiplyMergeHeap[identity];
                        })
                    }
                },
                after({trans, lastValue}) {
                    trans.targetHeap.isExecuting = false;
                    trans.targetHeap.callbacks = trans.targetHeap.callbacks
                        .filter(callback => {
                            callback({returnValue: lastValue, isError: false});
                            return false;
                        });
                    return lastValue;
                },
                onError({trans, error}) {
                    trans.targetHeap.isExecuting = false;
                    trans.targetHeap.callbacks = trans.targetHeap.callbacks
                        .filter(callback => {
                            callback({error, isError: true});
                            return false;
                        });
                },
                adaptAsync: true
            }
        );
    }

}