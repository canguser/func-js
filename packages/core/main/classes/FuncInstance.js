export function assignInstance(origin, target) {
    Object.setPrototypeOf(origin, Object.getPrototypeOf(target));
    return origin;
}

export function assignPrototype(origin, targetType) {
    Object.setPrototypeOf(origin, targetType.prototype);
    return origin;
}

export class FuncInstance extends Function {

    bind(context) {
        return assignInstance(super.bind(context), this);
    }

    after(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                const result = _this.apply(this, args);
                return cb.apply(this, [_this, args, result])
            }, this
        );
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

    before(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                cb.apply(this, [_this, args]);
                return _this.apply(this, args);
            }, this
        );
    }
}