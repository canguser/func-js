import {AsyncFuncInstance} from "./AsyncFuncInstance";
import {give} from "@func-js/core";
import {genID, getHashCode} from "@func-js/utils";
import {METHOD_END, METHOD_START, PROCESS_END, PROCESS_START} from "../constants/EventConstants";

const managerDefaultOptions = {
    processIdentity: ''
};

const defaultOptions = () => ({
    managerType: AsyncManager,
    instanceType: AsyncFuncInstance,
    managerArgs: [],
    manager: undefined
});

const eventOptions = {
    isOnce: false,
    isAsync: false,
    identity: ''
};

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

export class AsyncManager {

    constructor(options) {
        this.options = {...managerDefaultOptions, ...options};
        this.memoryStorage = {};
        this.eventsMapper = {};
        initialProcess.call(this);
    }

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

    getMemoryStorage() {
        return this.memoryStorage;
    }

    use(func, options = {}) {
        return AsyncManager.use(
            func, {
                manager: this,
                ...options
            }
        )
    }

    static use(func, options = {}) {
        options = {...defaultOptions(), ...options};
        const {manager} = options;
        return give(func, {
            instanceType: options.instanceType
        }).setManager(
            manager && manager instanceof AsyncManager ? manager : new options.managerType(...options.managerArgs)
        );
    };
}