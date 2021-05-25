# ![@func-js](https://palerock.cn/api-provider/files/view?identity=L2FydGljbGUvaW1hZ2UvMjAyMTAxMDQyMzIyMDQ2NzNsM0plc21xMC5wbmc&w=150 "@func-js")

> The wonderful lib for function in `Javascript`

## Packages
- [`@func-js/core`](https://github.com/canguser/func-js/tree/master/packages/core): The core js, includes the basic functions and usages.
- [`@func-js/async`](https://github.com/canguser/func-js/tree/master/packages/async): The enhancement for core js, get to support multi features for async methods.
- [`@func-js/utils`](https://github.com/canguser/func-js/tree/master/packages/utils): The utils for all packages.

## Demos

1. **Method Hooker** - [Live Demo](https://runkit.com/canguser/5ff33160efc5540013be0884)

    If you want to do something before or after the method called, you can using `before` or `after` method from `@func-js/core` module.
    ```javascript
    const {give} = require('@func-js/core');

    /**
     * Auto parameters by using before
     */

    function genInfo(id) {
        return {
            id: id,
            name: 'Info #' + id
        }
    }

    var autoGenInfo = give(genInfo)
        .before(function (params) {
            var args = params.args;
            if (!args[0]) {
                args[0] = '88888';
            }
        });

    console.log(autoGenInfo());         // > { id: '88888', name: 'Info #88888', autoGen: true }
    console.log(autoGenInfo('4123'));   // > { id: '4123', name: 'Info #4123' }

    /**
     * Using after to sign now timestamp for last return value
     */

    var signTimeInfo = autoGenInfo.after(
        function (params) {
            var lastValue = params.lastValue;
            lastValue.singTime = Date.now();
            return lastValue;
        }
    );

    console.log(signTimeInfo());        // > { id: '88888', name: 'Info #88888', singTime: 1609772675561 }
    ```

## Documents
- `@func-js/core`: [Documentation](https://github.com/canguser/func-js/tree/master/packages/core/docs/readme.md)
- `@func-js/async`: [Documentation](https://github.com/canguser/func-js/tree/master/packages/async/docs/readme.md)
- `@func-js/utils`: [Documentation](https://github.com/canguser/func-js/tree/master/packages/utils/docs/readme.md)

## Need Contributors
1. Fork the git repository, and download to local.
2. Run `yarn install` to begin your developments.

## Git Repository
- Github: [https://gitee.com/HGJing/func-js.git](https://gitee.com/HGJing/func-js.git)
- Gitee: [https://github.com/canguser/func-js.git](https://github.com/canguser/func-js.git)