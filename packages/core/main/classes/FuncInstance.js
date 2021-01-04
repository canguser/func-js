import {assignInstance, assignProperty, genID} from "@func-js/utils";

/**
 * @class The class included the function's extra methods
 * @augments Function
 * @property id {string}        the id only for this instance
 * @property uniqueId {string}  the id for the chain of method called
 */
export class FuncInstance extends Function {

    /**
     * Just a callback with the resolve params
     * @callback resolveCallback
     * @param res{*=}   the callback param
     */

    /**
     * Callback when using before method
     * @callback beforeCallback
     * @param params{Object=}                   Params for before callback
     * @param params.origin{Function=}          The origin method of the AOP method
     * @param params.args{Array<*>=}            The args of the AOP method
     * @param params.preventDefault{Function=}  The method if called will prevent method executing,
     *                                          and using this callback return value instead of APO method return value
     * @param params.trans{Object=}             The temp storage place from the APO method, you can set the property in the before method
     * @return {*}                              If preventDefault event called, the return value will be the AOP method's return value
     */

    /**
     * Callback when using after method
     * @callback afterCallback
     * @param params{Object=}           Params for after callback
     * @param params.origin{Function=}  The origin method of the AOP method
     * @param params.args{Array<*>=}    The args of the AOP method
     * @param params.lastValue{*=}      The value returned from AOP method by default
     * @param params.trans{Object=}     The temp storage place from the APO method,
     *                                  you can get the property from before method, or set the property
     */

    /**
     * Callback when using error method
     * @callback errorCallback
     * @param params{Object=}                   Params for error callback
     * @param params.origin{Function=}          The origin method of the AOP method
     * @param params.args{Array<*>=}            The args of the AOP method
     * @param params.error{*=}                  The error object | error message
     * @param params.resolve{resolveCallback=}  When this method called the AOP method will use the params as return value
     * @param params.trans{Object=}             The temp storage place from the APO method,
     *                                          you can get the property from before or after method
     */

    /**
     * @private
     * @param target{FuncInstance}
     */
    initAssign(target) {
        this.id = genID(7);
        // all func from FuncInstance has the uniqueId
        assignProperty(this, target, 'uniqueId', () => genID(7));
    }

    /**
     * For a given function, creates a bound function that has the same body as the original function.
     * The this object of the bound function is associated with the specified object, and has the specified initial parameters.
     * @param context               An object to which the this keyword can refer inside the new function.
     * @param argArray {Array=}     A list of arguments to be passed to the new function.
     * @return {FuncInstance | Function}
     */
    bind(context, argArray = []) {
        return assignInstance(super.bind(context, argArray), this);
    }

    /**
     * Making something called before the AOP method
     * @param cb{beforeCallback}    The callback called before the AOP method calling
     * @param adaptAsync{boolean=}  If equals true & callback returned a Promise result,
     *                              the AOP method will called after the Promise finished.
     * @return {FuncInstance|Function}
     */
    before(cb, adaptAsync = false) {
        return this.surround(
            {
                before: cb,
                adaptAsync
            }
        )
    }

    /**
     * Making something called after the AOP method
     * @param cb{afterCallback}     The callback called after the AOP method calling
     * @param adaptAsync{boolean=}  If equals true & AOP method returned a Promise result,
     *                              the after method will called after the Promise finished.
     * @return {FuncInstance|Function}
     */
    after(cb, adaptAsync = false) {
        return this.surround(
            {
                after: cb,
                adaptAsync
            }
        )
    }

    /**
     * Making something called surround the APO method
     * @param options{Object} options for surround method
     * @param options.before{beforeCallback=}   The callback called before the AOP method calling
     * @param options.after{afterCallback=}     The callback called after the AOP method calling
     * @param options.onError{errorCallback=}   The callback called while an error happening from the AOP method calling
     * @param options.adaptAsync{boolean=}      If equals TRUE, all surround methods will waiting the last Promise result
     * @return {FuncInstance|Function}
     */
    surround(
        {
            before = undefined,
            after = undefined,
            onError = undefined,
            adaptAsync = false
        }
    ) {
        const lastOrigin = this;

        if (typeof lastOrigin !== 'function') {
            return lastOrigin;
        }

        return assignInstance(
            function (...args) {
                const trans = {};
                const baseParams = {
                    origin: lastOrigin, args, trans
                };
                const validErrorMethod = typeof onError === 'function';
                try {
                    let preventDefault = false;
                    // parsing before
                    let beforeResult;
                    if (typeof before === 'function') {
                        beforeResult = before.call(this, {
                            ...baseParams,
                            preventDefault() {
                                preventDefault = true;
                            }
                        });
                        if (preventDefault) {
                            return beforeResult;
                        }
                    }

                    let returnValue;
                    if (beforeResult instanceof Promise && adaptAsync) {
                        returnValue = beforeResult.then(
                            () => {
                                return lastOrigin.apply(this, args);
                            }
                        )
                    } else {
                        returnValue = lastOrigin.apply(this, args);
                    }

                    // parsing origin
                    if (typeof after === 'function') {
                        if (returnValue instanceof Promise && adaptAsync) {
                            returnValue = returnValue.then(value => after.call(this, {...baseParams, lastValue: value}))
                        } else {
                            returnValue = after.call(this, {...baseParams, lastValue: returnValue});
                        }
                    }

                    if (returnValue instanceof Promise && adaptAsync && validErrorMethod) {
                        return returnValue.catch(error => {
                            let isSolved = false;
                            let message = '';
                            const resolve = (msg) => {
                                message = msg;
                                isSolved = true;
                            };
                            return Promise.resolve(onError.call(this, {...baseParams, error, resolve}))
                                .then(solution => {
                                    if (!isSolved) {
                                        throw error;
                                    }
                                    return message || solution;
                                });
                        });
                    }
                    return returnValue;
                } catch (error) {
                    if (!validErrorMethod) {
                        throw error;
                    }
                    let isSolved = false;
                    let message = '';
                    const resolve = (msg) => {
                        message = msg;
                        isSolved = true;
                    };
                    const result = onError.call(this, {...baseParams, error, resolve});
                    if (!isSolved) {
                        throw error;
                    }
                    return message || result;
                }
            }, this
        )
    }

    /**
     * Making an async method call then method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    then(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                const result = _this.apply(this, args);
                return Promise.resolve(result).then(cb)
            }, this
        );
    }

    /**
     * Making an async method call catch method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    catch(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                let result;
                try {
                    result = _this.apply(this, args);
                    if (result instanceof Promise) {
                        return result.catch(cb);
                    }
                } catch (e) {
                    result = cb.call(this, e);
                }
                return result;
            }, this
        )
    }

    /**
     * Making an async method call finally method
     * @param cb{resolveCallback=}
     * @return {FuncInstance|Function}
     */
    finally(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                const doIgnoreCallback = function () {
                    try {
                        cb.call(this);
                    } catch (e) {
                        // ignore
                    }
                };
                try {
                    const result = _this.apply(this, args);
                    if (result instanceof Promise) {
                        if (typeof result.finally === 'function') {
                            return result.finally(
                                () => doIgnoreCallback()
                            )
                        }
                        return result.catch(e => e)
                            .then(e => {
                                doIgnoreCallback();
                                if (e instanceof Error) {
                                    throw e;
                                }
                            });
                    } else {
                        doIgnoreCallback();
                    }
                    return result;
                } catch (e) {
                    doIgnoreCallback();
                    throw e;
                }

            }, this
        )
    }
}