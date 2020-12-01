import {assignInstance, assignProperty, genID} from "@func-js/utils";

export class FuncInstance extends Function {

    initAssign(target) {
        this.id = genID(7);
        // all func from FuncInstance has the uniqueId
        assignProperty(this, target, 'uniqueId', () => genID(7));
    }

    bind(context) {
        return assignInstance(super.bind(context), this);
    }

    before(cb, adaptAsync = false) {
        return this.surround(
            {
                before: cb,
                adaptAsync
            }
        )
    }

    after(cb, adaptAsync = false) {
        return this.surround(
            {
                after: cb,
                adaptAsync
            }
        )
    }

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
                    origin, args, trans
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

    then(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                const result = _this.apply(this, args);
                return Promise.resolve(result).then(cb)
            }, this
        );
    }

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