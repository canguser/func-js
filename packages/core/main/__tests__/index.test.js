import {FuncGiven} from "../index";

describe('index.js', () => {
    it('should convert function', function () {
        function doIt() {
            console.log('hello');
        }

        const a = FuncGiven(doIt)
            .before(
                (m, args) => {
                    args[0] += 1;
                    console.log('before called')
                }
            )
            .after(
                (m, args, value) => {
                    console.log('after called');
                    return 1;
                }
            )

    });
});