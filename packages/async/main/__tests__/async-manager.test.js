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
        it('should static use method', () => {
            const sum = AsyncManager.use((a, b) => wait(100, a + b));
            expect(sum(5, 6)).resolves.toBe(11);
            expect(sum.asyncManager).toBeInstanceOf(AsyncManager);
        });

        it('should works with cache method', () => {
            expect.assertions(3);
            const sum = AsyncManager.use((a, b) => wait(100, 100)
                .then(res => {
                    expect(res).toBe(100);
                    return a + b;
                })).cache();

            return sum(1, 2).then(() => sum(1, 2))
                .then(() => sum(3, 4))
                .then(() => sum(3, 4))
                .then(() => sum(5, 6));
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
            const fetchInfo = manager.use(() => wait(100, 100)).sign('fetchInfo');

            expect(fetchInfo()).resolves.toBe(100);
            expect(wait(50).then(() => fetchInfo())).resolves.toBe(null);

        });
    }
);