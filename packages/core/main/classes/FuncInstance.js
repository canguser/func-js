import {assignInstance, assignProperty, genID} from "@func-js/utils";

export class FuncInstance extends Function {

    initAssign(target) {
        this.id = genID(7);
        // all func from FuncInstance has the uniqueId
        assignProperty(this, target, 'uniqueId', () => genID(7));
        // initial func trans
        assignProperty(this, target, 'trans', () => {});
    }

    bind(context) {
        return assignInstance(super.bind(context), this);
    }

    before(cb) {
        const _this = this;
        return assignInstance(
            function (...args) {
                let isPreventDefault = false;
                const beforeValue = cb.apply(this, [_this, args, {
                    preventDefault() {
                        isPreventDefault = true;
                    },
                    trans: _this.trans
                }]);
                return isPreventDefault ? beforeValue : _this.apply(this, args);
            }, this
        );
    }

    after(cb, adaptAsync = false) {
        const _this = this;
        return assignInstance(
            function (...args) {
                const result = _this.apply(this, args);
                if (adaptAsync && result instanceof Promise) {
                    return result.then(res => {
                        return cb.apply(this, [_this, args, result, {trans: _this.trans}]);
                    }).catch(e => {
                        cb.apply(this, [_this, args, undefined]);
                        return Promise.reject(e);
                    })
                }
                return cb.apply(this, [_this, args, result, {trans: _this.trans}])
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
}