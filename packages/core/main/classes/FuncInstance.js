function convertTarget(func, target) {
    Object.setPrototypeOf(func, Object.getPrototypeOf(target));
    return func;
}

export class FuncInstance extends Function {

    bind(context) {
        return convertTarget(super.bind(context), this);
    }

    after(cb) {
        const _this = this;
        return convertTarget(function (...args) {
            const result = _this.apply(this, args);
            if (result instanceof Promise) {
                return result.then(
                    res => {
                        return cb.apply(this, [_this, args, res])
                    }
                )
            }
            return cb.apply(this, [_this, args, result])
        }, this);
    }

    before(cb) {
        const _this = this;
        return convertTarget(function (...args) {
            cb.apply(this, [_this, args]);
            return _this.apply(this, args);
        }, this)
    }
}