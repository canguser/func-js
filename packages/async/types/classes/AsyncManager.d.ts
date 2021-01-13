/**
 * {@link AsyncManager} default options
 * @readonly
 * @type {Object}
 */
export const managerDefaultOptions: any;
export function defaultOptions(): any;
/**
 * Initialed event's default options
 * @readonly
 * @type {{identity: string, isAsync: boolean, isOnce: boolean}}
 */
export const eventOptions: {
    identity: string;
    isAsync: boolean;
    isOnce: boolean;
};
/**
 * This class used to initialize {@link AsyncFuncInstance},
 * register and listen event for async methods,
 * manager caches and more storage info
 * @class
 * @property options{Object}        Options of {@link AsyncManager}
 * @property memoryStorage{Object}  Used to store cache in memories
 * @property eventsMapper{Object}   Used to store events' mapper
 * @property signMapper{Object}     Used to store the sign identity mapper
 */
export class AsyncManager {
    /**
     * Initialize {@link AsyncFuncInstance} using options and new {@link AsyncManager} instance
     * @param func{Function}                   Specified the target function to be {@link AsyncFuncInstance} instance
     * @param options{Object=}                 The options to initialize {@link AsyncFuncInstance}
     * @return {AsyncFuncInstance|Function}    The {@link AsyncFuncInstance} instance
     */
    static use(func: Function, options?: any | undefined): AsyncFuncInstance | Function;
    /**
     * @constructs AsyncManager
     * @param options{Object=} options to initialize manager
     */
    constructor(options?: any | undefined);
    options: any;
    memoryStorage: {};
    eventsMapper: {};
    signMapper: {};
    preCacheStorage: {};
    managedData: {};
    /**
     * Emit event
     * @param eventName{string}         The event name to emit
     * @param options{Object=}          Options for emit method
     * @param options.identity{Object=} Something to identity the event, only when event name with the same identity emit,
     *                                  the event callback will be fired
     * @param options.params{Object=}   Specified the params pass to event, ordering to send with event callback
     */
    emit(eventName: string, { identity, params }?: any | undefined): void;
    /**
     * Register event handler
     * @param eventName{string}         Event name for this handler callback
     * @param callback{Function}        While event emitting, this callback will be called
     * @param options{Object=}          Options for on method
     * @param options.identity{Object=} Something to identity the event, only when event name with the same identity emit,
     *                                  the event callback will be fired
     * @param options.params{Object=}   Specified the params pass to event, ordering to send with event callback
     * @param options.isOnce{Boolean=}  If set true, the callback will only triggered once, default false
     * @param options.isAsync{Boolean=} If set true, the callback will exec async
     * @return {string}                 The event identity, you can using off method to cancel this event listener
     */
    on(eventName: string, callback: Function, options?: any | undefined): string;
    /**
     * Remove the event register
     * @param eventIdentity{string|Boolean=} The return value of on method to cancel listening, if set true, all event will be canceled.
     */
    off(eventIdentity?: (string | boolean) | undefined): void;
    /**
     * Get storage cached in memory
     * @return {Object}
     */
    getMemoryStorage(): any;
    /**
     * Get signed mapper existed
     * @return {Object}
     */
    getExistedSignMapper(): any;
    /**
     * Initialize {@link AsyncFuncInstance} using options and using this {@link AsyncManager} instance
     * @param func{Function}                   Specified the target function to be {@link AsyncFuncInstance} instance
     * @param options{Object=}                 The options to initialize {@link AsyncFuncInstance}
     * @return {AsyncFuncInstance|Function}    The {@link AsyncFuncInstance} instance
     */
    use(func: Function, options?: any | undefined): AsyncFuncInstance | Function;
    /**
     * Get the pre cache of target instance
     * @param instanceId{string} The id of target instance
     * @return {Object}
     */
    getPreCacheStorage(instanceId: string): any;
}
import { AsyncFuncInstance } from "./AsyncFuncInstance";
