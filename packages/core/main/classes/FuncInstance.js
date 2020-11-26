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