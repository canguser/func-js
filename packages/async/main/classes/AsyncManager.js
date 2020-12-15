import {AsyncFuncInstance} from "./AsyncFuncInstance";
import {give} from "@func-js/core";
import {genID, getHashCode} from "@func-js/utils";
import {METHOD_END, METHOD_START, PROCESS_END, PROCESS_START} from "../constants/EventConstants";

/**
 * {@link AsyncManager} default options
 * @readonly
 * @type {Object}
 */
export const managerDefaultOptions = {
    processIdentity: ''
};

/**
 * get {@link AsyncFuncInstance} default options
 * @return {Object}
 */
export const defaultOptions = () => ({
    managerType: AsyncManager,
    instanceType: AsyncFuncInstance,
    managerArgs: [],
    manager: undefined
});

/**
 * Initialed event's default options
 * @readonly
 * @type {{identity: string, isAsync: boolean, isOnce: boolean}}
 */
export const eventOptions = {
    isOnce: false,
    isAsync: false,
    identity: ''
};

/**
 * This method only called while AsyncFuncInstance initialized,
 * and register process event | emit it
 * @private
 */
function initialProcess() {
    const {
        processIdentity = managerDefaultOptions.processIdentity
    } = this.options;

    let inProcesses = 0;

    this.on(METHOD_START, () => {
        if (inProcesses === 0) {
            this.emit(PROCESS_START, {identity: processIdentity});
        }
        inProcesses++;
    });

    this.on(METHOD_END, () => {
        inProcesses--;
        if (inProcesses <= 0) {
            inProcesses = 0;
            this.emit(PROCESS_END, {identity: processIdentity});
        }
    });
}

/**
 * This class used to initialize {@link AsyncFuncInstance},
 * register and listen event for async methods,
 * manager caches and more storage info
 * @class
 * @property options{Object}
 * @property memoryStorage{Object}
 * @property eventsMapper{Object}
 * @property signMapper{Object}
 */
export class AsyncManager {

    /**
     * @param options{Object=} options to initialize manager
     */
    constructor(options) {
        this.options = {...managerDefaultOptions, ...options};
        this.memoryStorage = {};
        this.eventsMapper = {};
        this.signMapper = {};
        initialProcess.call(this);
    }

    /**
     * Emit event
     * @param eventName{string}         The event name to emit
     * @param options{Object=}          Options for emit method
     * @param options.identity{Object=} Something to identity the event, only when event name with the same identity emit,
     *                                  the event callback will be fired
     * @param options.params{Object=}   Specified the params pass to event, ordering to send with event callback
     */
    emit(eventName, {identity = eventOptions.identity, params = {}} = {}) {
        let events = this.eventsMapper[eventName] || [];
        identity = getHashCode(identity);
        events.filter(e => e.options.identity === identity)
            .forEach(e => {
                const {callback, options = {}} = e;
                const {isAsync} = options;
                if (typeof callback === 'function') {
                    if (isAsync) {
                        Promise.resolve().then(() => callback({params, ...options}));
                    } else {
                        callback({params, ...options})
                    }
                }
            });
        events = events.filter(e => !e.options.isOnce && e.options.identity === identity);
        this.eventsMapper[eventName] = events;
    }

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
    on(eventName, callback, options = {}) {
        options = {...eventOptions, ...options};
        options.identity = getHashCode(options.identity);
        let events = this.eventsMapper[eventName] || [];
        const eventIdentity = genID(7);
        events.push({
            callback, options, eventIdentity
        });
        this.eventsMapper[eventName] = events;
        return eventIdentity;
    }

    /**
     * Remove the event register
     * @param eventIdentity{string|Boolean=} The return value of on method to cancel listening, if set true, all event will be canceled.
     */
    off(eventIdentity) {
        const isRemoveAllEvents = eventIdentity === true;
        if (isRemoveAllEvents) {
            // remove all events
            this.eventsMapper = {};
        } else if (eventIdentity) {
            // remove event by eventIdentity
            const keys = Object.keys(this.eventsMapper);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const events = this.eventsMapper[key] || [];

                let hasOff = false;
                const filteredEvents = events.filter(e => {
                    if (e.eventIdentity === eventIdentity) {
                        hasOff = true;
                        return false;
                    }
                    return true;
                });

                if (hasOff) {
                    this.eventsMapper[key] = filteredEvents;
                    break;
                }
            }
        }
    }

    /**
     * Get storage cached in memory
     * @return {Object}
     */
    getMemoryStorage() {
        return this.memoryStorage;
    }

    /**
     * Get signed mapper existed
     * @return {Object}
     */
    getExistedSignMapper() {
        return this.signMapper;
    }

    /**
     * Initialize {@link AsyncFuncInstance} using options and using this {@link AsyncManager} instance
     * @param func{Function}                   Specified the target function to be {@link AsyncFuncInstance} instance
     * @param options{Object=}                 The options to initialize {@link AsyncFuncInstance}
     * @return {AsyncFuncInstance|Function}    The {@link AsyncFuncInstance} instance
     */
    use(func, options = {}) {
        return AsyncManager.use(
            func, {
                manager: this,
                ...options
            }
        )
    }

    /**
     * Initialize {@link AsyncFuncInstance} using options and new {@link AsyncManager} instance
     * @param func{Function}                   Specified the target function to be {@link AsyncFuncInstance} instance
     * @param options{Object=}                 The options to initialize {@link AsyncFuncInstance}
     * @return {AsyncFuncInstance|Function}    The {@link AsyncFuncInstance} instance
     */
    static use(func, options = {}) {
        options = {...defaultOptions(), ...options};
        const {manager} = options;
        return give(func, {
            instanceType: options.instanceType
        }).setManager(
            manager && manager instanceof AsyncManager ? manager : new options.managerType(...options.managerArgs)
        );
    };


    /**
     * Get the pre cache of target instance
     * @param instanceId{string} The id of target instance
     * @return {Object}
     */
    getPreCacheStorage(instanceId) {

    }
}