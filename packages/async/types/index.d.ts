import {FuncInstance} from "@func-js/core";

export const PROCESS_START: string;
export const PROCESS_END: string;
export const METHOD_START: string;
export const METHOD_END: string;

interface EventOptions {
    identity: string,
    isOnce: boolean,
    isAsync: boolean,
}

interface DefaultOptions {
    managerType: Function,
    instanceType: Function,
    managerArgs: Array<any>,
    manager: AsyncManager
    params: Object
}

export class AsyncManager {

    constructor(options: Object);

    public emit(
        eventName: string, options?: { identity?: string, params?: Object }
    ): void

    public on(
        eventName: string, callback: (
            params?: DefaultOptions
        ) => void, options?: EventOptions
    ): string

    public off(eventIdentity: string | boolean): void

    public use<T extends AsyncFuncInstance>(func: Function): T

    public getMemoryStorage(): Object

    public getExistedSignMapper(): Object
}

export enum CacheType {
    LOCAL_STORAGE, SESSION_STORAGE, MEMORY, CUSTOM
}

export class AsyncFuncInstance extends FuncInstance {

    protected asyncManager: AsyncManager;

    public setManager<T extends AsyncFuncInstance, F extends AsyncManager>(manager: F): T

    public sign<T extends AsyncFuncInstance, F extends AsyncManager>(
        local: string,
        options?: { identity?: Function, asyncManager?: F }
    ): T

    public process<T extends AsyncFuncInstance, F extends AsyncManager>(
        options?: {
            start?: () => void,
            end?: () => void,
            context?: Object
        },
        asyncManager?: F
    ): T

    public cache<T extends AsyncFuncInstance, F extends AsyncManager>(
        options?: {
            type?: CacheType,
            setter?: (key: any, value: any) => void,
            getter?: (key: any) => any,
            keyPrefix?: string,
            expire?: number
        }, asyncManager?: F
    ): T
}