import {FuncInstance, give} from "@func-js/core";
import {AsyncManager} from "./AsyncManager";
import {METHOD_END, METHOD_START} from "../constants/EventConstants";
import {assignProperty, generateStrategyMapper, getHashCode} from "@func-js/utils";

export const CacheType = {
    LOCAL_STORAGE: Symbol('LOCAL_STORAGE'),
    SESSION_STORAGE: Symbol('SESSION_STORAGE'),
    MEMORY: Symbol('MEMORY'),
    CUSTOM: Symbol('CUSTOM')
};

const globalMemoryStorage = {};

export class AsyncFuncInstance extends FuncInstance {

    initAssign(target) {
        super.initAssign(target);
        assignProperty(this, target, 'asyncManager', () => undefined);
    }

    setManager(manager) {
        if (manager && manager instanceof AsyncManager) {
            this.asyncManager = manager;
        }
        return this;
    }

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
            end = give(end).after((m, args, returnValue) => {
                asyncManager.emit(METHOD_END);
                return returnValue;
            }, true);
        }
        return this.before(() => start.call(context || this))
            .after((m, args, returnValue) => {
                end.call(context || this);
                return returnValue;
            }, true)
    }

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

        return this
            .before(
                (
                    m, args,
                    {
                        preventDefault,
                        trans
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
                }
            )
            .after(
                (
                    m, args, returnValue,
                    {trans}
                ) => {
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
                    delete trans.isCached;
                    return returnValue;
                }
            )
    }


}