import {AsyncManager} from '../classes/AsyncManager';
import {METHOD_END, METHOD_START, PROCESS_END, PROCESS_START} from "../constants/EventConstants";

function wait(ms, args) {
    return new Promise(((resolve) => {
        setTimeout(function () {
            resolve(args);
        }, ms)
    }))
}

describe(
    'async-manager', () => {
        it('should static [use] method', () => {
            const sum = new AsyncManager().use((a, b) => wait(0, a + b));
            expect(sum.asyncManager).toBeInstanceOf(AsyncManager);
            return expect(sum(5, 6)).resolves.toBe(11);
        });

        it('should works with [cache] method', () => {
            expect.assertions(3);
            const sum1 = new AsyncManager().use((a, b) => wait(100, 100)
                .then(res => {
                    expect(res).toBe(100);
                    return a + b;
                })).cache();

            return sum1(1, 2).then(() => sum1(1, 2))
                .then(() => sum1(3, 4))
                .then(() => sum1(3, 4))
                .then(() => sum1(5, 6));
        });

        it('should [process] method works', function () {
            const manager = new AsyncManager();
            const fetchInfo = manager.use(() => wait(100)).process();
            const fetchInfo2 = manager.use(() => wait(200)).process();

            expect.assertions(10);

            manager.on(METHOD_START, () => {
                expect(1).toBe(1);
            });
            manager.on(METHOD_END, () => {
                expect(1).toBe(1);
            });

            manager.on(PROCESS_START, () => {
                expect(1).toBe(1);
            });
            manager.on(PROCESS_END, () => {
                expect(1).toBe(1);
            });

            return Promise.all(
                [
                    fetchInfo(),
                    fetchInfo(),
                    fetchInfo2(),
                    fetchInfo2(),
                ]
            )
        });

        it('should [sign] method works', function () {
            const manager = new AsyncManager();
            const fetchInfo = manager.use(() => wait(500, 100)).sign('fetchInfo');

            return Promise.all(
                [
                    expect(fetchInfo()).resolves.toBe(null),
                    expect(wait(250).then(() => fetchInfo())).resolves.toBe(100)
                ]
            )
        });

        it('should [pre-cache] method works', function () {

            expect.assertions(5);

            let i = 0;
            const fetchData = function () {
                return wait(100).then(() => {
                    expect(1).toBe(1);
                    return i++;
                });
            };

            const manager = new AsyncManager();

            const func = manager.use(fetchData).preCache();

            const result1 = func();
            const result2 = result1.then(() => func.pre());
            const result3 = result2.then(() => func());

            return Promise.all([
                expect(result1).resolves.toBe(0),
                expect(result2).resolves.toBe(1),
                expect(result3).resolves.toBe(1)
            ]);
        });

        it('should [multiplyMerge] method works', function () {

            expect.assertions(9);

            let i = 0;
            const fetchData = function () {
                return wait(100).then(() => {
                    expect(1).toBe(1);
                    if (i === 2) {
                        throw new Error('i equals 2');
                    }
                    return i++;
                });
            };
            const manager = new AsyncManager();
            const func = manager.use(fetchData).multiplyMerge();
            const result1 = func(); // +1
            const result2 = func();
            const result3 = func()
                .then(() => func()); // +1
            const result4 = func()
                .then(() => func());
            const result5 = func()
                .then(() => func())
                .then(() => func()); // +1
            const result6 = func()
                .then(() => func())
                .then(() => func());

            return Promise.all([
                expect(result1).resolves.toBe(0),                   // +1
                expect(result2).resolves.toBe(0),                   // +1
                expect(result3).resolves.toBe(1),                   // +1
                expect(result4).resolves.toBe(1),                   // +1
                expect(result5).rejects.toThrow('i equals 2'),      // +1
                expect(result6).rejects.toThrow('i equals 2')       // +1
            ]);

        });
    }
);