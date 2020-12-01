import {AsyncFuncInstance} from "./AsyncFuncInstance";
import {give} from "@func-js/core";

const defaultOptions = {
    managerType: AsyncManager,
    instanceType: AsyncFuncInstance,
    managerArgs: []
};

export class AsyncManager {

    emit(eventName, params) {

    }

    on(eventName, params) {

    }

    getMemoryStorage() {

    }

    static use(func, options = {}) {
        options = {...defaultOptions, ...options};
        return give(func, {
            instanceType: options.instanceType
        }).setManager(
            new options.managerType(...options.managerArgs)
        );
    };
}