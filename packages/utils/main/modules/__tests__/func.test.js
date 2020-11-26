const {getAllProperty} = require('../func');

describe('func.js', () => {
    it('should get all property', function () {

        class A {
            constructor() {
                this.a = 100;
            }

            b() {
            }
        }

        class B extends A {
            constructor(props) {
                super(props);
                this.a = 100;
                this.c = 100;
            }


            d() {
            }
        }

        const result = getAllProperty(new B());

        expect(result.includes('a')).toBeTruthy();
        expect(result.includes('b')).toBeTruthy();
        expect(result.includes('c')).toBeTruthy();
        expect(result.includes('d')).toBeTruthy();
    });
});