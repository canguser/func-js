import {FuncInstance, give} from "@func-js/core";
import {AsyncManager} from "./AsyncManager";
import {PROCESS_END, PROCESS_START} from "../constants/EventConstants";
import {assignProperty, generateStrategyMapper, getHashCode} from "@func-js/utils";

export class CacheType {
    static LOCAL_STORAGE = Symbol('LOCAL_STORAGE');
    static SESSION_STORAGE = Symbol('SESSION_STORAGE');
    static MEMORY = Symbol('MEMORY');
    static CUSTOM = Symbol('CUSTOM');
}

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
                asyncManager.emit(PROCESS_START)
            });
            end = give(end).after((m, args, returnValue) => {
                asyncManager.emit(PROCESS_END);
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
                        trans.isCached = true;
                        return cachedValue.data;
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
                        setter(key, {
                            data: returnValue,
                            timestamp: Date.now()
                        })
                    }
                    return returnValue;
                }, true
            )
    }


}