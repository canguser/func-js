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