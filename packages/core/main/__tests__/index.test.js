import {FuncGiven} from "../index";
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

        const a = FuncGiven(doIt)
            .before(
                (m, args) => {
                    expect(args[0]).toBe(number);
                    args[0] += 1;
                }
            )
            .after(
                (m, args, value) => {
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
        const action = FuncGiven(wait).then(
            args => args[0]
        );
        return expect(action(0, [param])).resolves.toBe(param);

    });

    it('should works with [catch] method', function () {
        expect.assertions(3);
        const param = 1;
        const action = FuncGiven(wait)
            .then(
                args => {
                    return Promise.reject(args[0]);
                }
            ).catch(e => e);

        const action2 = FuncGiven(
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
        function callName() {
            return this.name;
        }

        const newFunc = FuncGiven(callName)
            .bind({
                name: 'nihao'
            });

        expect(newFunc()).toBe('nihao');
        expect(newFunc).toBeInstanceOf(FuncInstance);

    });

    it('should works for [finally] method', function () {
        expect.assertions(8);

        const func1 = FuncGiven(wait)
            .finally(
                () => {
                    expect(1).toBe(1);
                }
            );

        const func2 = FuncGiven(function () {
            throw new Error('hahaha');
        }).finally(
            () => {
                expect(1).toBe(1);
            }
        );

        const func3 = FuncGiven(function () {
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

        const func1 = FuncGiven(wait)
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
});