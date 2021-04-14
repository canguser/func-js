import {define, give} from "../index";
import {FuncInstance} from "../classes/FuncInstance";

function wait(ms, args) {
    return new Promise(((resolve) => {
        setTimeout(function () {
            resolve(args);
        }, ms)
    }))
}

describe('index.js', () => {
    it('should using [before / after] function', function () {
        function doIt(number) {
            return number;
        }

        const number = 100;

        const a = give(doIt)
            .before(
                ({args}) => {
                    expect(args[0]).toBe(number);
                    args[0] += 1;
                }
            )
            .after(
                ({args, lastValue: value}) => {
                    expect(value).toBe(number + 1);
                    expect(args[0]).toBe(number);
                    return value + 1;
                }
            );
        expect(a(number)).toBe(number + 2);
        expect.assertions(4);
    });

    it('should works with [then] method', function () {
        expect.assertions(1);
        const param = 1;
        const action = give(wait).then(
            args => args[0]
        );
        return expect(action(0, [param])).resolves.toBe(param);

    });

    it('should works with [catch] method', function () {
        expect.assertions(3);
        const param = 1;
        const action = give(wait)
            .then(
                args => {
                    return Promise.reject(args[0]);
                }
            ).catch(e => e);

        const action2 = give(
            function () {
                throw new Error('hahah');
            }
        ).catch(e => {
            expect(e.message).toBe('hahah');
            return 'nothing';
        });
        expect(action2()).toBe('nothing');
        return expect(action(0, [param])).resolves.toBe(1);
    });

    it('should work as normal - [bind] method', function () {
        function callName(suffix) {
            return this.name + suffix;
        }

        const newFunc = give(callName)
            .bind({
                name: 'nihao'
            });

        expect(newFunc(' haha')).toBe('nihao haha');
        expect(newFunc).toBeInstanceOf(FuncInstance);

    });

    it('should works for [finally] method', function () {
        expect.assertions(8);

        const func1 = give(wait)
            .finally(
                () => {
                    expect(1).toBe(1);
                }
            );

        const func2 = give(function () {
            throw new Error('hahaha');
        }).finally(
            () => {
                expect(1).toBe(1);
            }
        );

        const func3 = give(function () {
        }).finally(
            () => {
                expect(1).toBe(1);
            }
        );

        expect(func2).toThrow('hahaha');
        func3();

        return Promise.all(
            [
                func1(0),
                expect(func1.then(() => Promise.reject('hahah1'))(0))
                    .rejects.toBe('hahah1'),
                expect(func1.then(() => {
                    throw new Error('hahah2');
                })(0)).rejects.toBeTruthy()
            ]
        )

    });

    it('should works for [finally] method without in Promise', function () {
        expect.assertions(5);

        const finallyMethod = Promise.prototype.finally;
        delete Promise.prototype.finally;

        const func1 = give(wait)
            .finally(
                () => {
                    expect(1).toBe(1);
                }
            );

        return Promise.all(
            [
                func1(0),
                expect(func1.then(() => Promise.reject('hahah1'))(0))
                    .rejects.toBeTruthy(),
                expect(func1.then(() => {
                    throw new Error('hahah2');
                })(0)).rejects.toBeTruthy()
            ]
        ).then(
            () => {
                Promise.prototype.finally = finallyMethod;
            }
        )
    });

    it('should works for [define] method', function () {

        const NoReturnFunc = define({
            noReturn: function () {
                return this.after(() => {
                    return undefined;
                })
            }
        });

        const func = give(() => 100, {instanceType: NoReturnFunc}).noReturn();

        expect(func()).toBeUndefined();

    });

    it('should using register function', function () {

        function modifiedReturn(v) {
            return this.after(() => {
                return v;
            })
        }

        function addResult(v) {
            expect(this.modifiedReturn).toBeTruthy();
            expect(this.modifiedParams).toBeTruthy();
            return this.after(({lastValue}) => {
                return lastValue + v;
            })
        }

        function modifiedParams(index, value) {
            return this.before(({args}) => {
                args[index] = value;
            })
        }

        const func1 = give(r => r)
            .register({modifiedReturn, modifiedParams});
        expect(func1(1)).toBe(1);
        expect(func1.modifiedReturn(15)(1)).toBe(15);
        expect(func1.register({addResult}).addResult(15).modifiedParams(0, 2)(1)).toBe(17)

        expect(FuncInstance.prototype.modifiedReturn).toBeFalsy();
        expect(FuncInstance.prototype.addResult).toBeFalsy();
        expect(FuncInstance.prototype.modifiedParams).toBeFalsy();


    });

    it('should using register class', function () {

        const func1 = give(r => r)
            .registerClass(instance => class extends instance {
                modifiedParams(index, value) {
                    return this.before(({args}) => {
                        args[index] = value;
                    })
                }

                modifiedReturn(v) {
                    return this.after(() => {
                        return v;
                    })
                }
            });
        expect(func1(1)).toBe(1);
        expect(func1.modifiedReturn(15)(1)).toBe(15);
        expect(func1.registerClass(instance => class extends instance {
            addResult(v) {
                expect(this.modifiedReturn).toBeTruthy();
                expect(this.modifiedParams).toBeTruthy();
                return this.after(({lastValue}) => {
                    return lastValue + v;
                })
            }

        }).addResult(15).modifiedParams(0, 2)(1)).toBe(17)

        expect(FuncInstance.prototype.modifiedReturn).toBeFalsy();
        expect(FuncInstance.prototype.addResult).toBeFalsy();
        expect(FuncInstance.prototype.modifiedParams).toBeFalsy();

    });
});