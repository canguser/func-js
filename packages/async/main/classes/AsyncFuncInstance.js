import {FuncInstance, give} from "@func-js/core";
import {AsyncManager} from "./AsyncManager";
import {PROCESS_START} from "../constants/EventConstants";

export class CacheType {
    static LOCAL_STORAGE = Symbol('LOCAL_STORAGE');
    static SESSION_STORAGE = Symbol('SESSION_STORAGE');
    static MEMORY = Symbol('MEMORY');
    static CUSTOM = Symbol('CUSTOM');
}

export class AsyncFuncInstance extends FuncInstance {

    process(
        {
            start = undefined,
            end = undefined,
            context = undefined
        } = {},
        asyncManager
    ) {
        if (asyncManager && asyncManager instanceof AsyncManager) {
            start = give(start).before(() => {
                asyncManager.emit(PROCESS_START)
            });
            end = give(end).after((m, args, returnValue) => {
                asyncManager.emit(PROCESS_START);
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
            getter = (key) => undefined
        } = {}
    ) {

    }


}