const path = require('path');
const configs = require('./package');

const sourceName = configs._sourceName || 'unname';
const sourceMiniName = sourceName + '.mini';

module.exports = env => {
    return {
        mode: env.production === 'true' ? 'production' : 'none',
        //entry:需要打包的文件
        entry: './main/index.js',
        output: {
            // filename:指定打包后js文件的名字
            filename: env.production === 'true' ? sourceMiniName + '.js' : sourceName + '.js',
            //path:指定打包后的文件放在那里
            path: path.resolve(__dirname, "dist"),
            libraryTarget: "umd",
            globalObject: "typeof self !== 'undefined' ? self : this"
        }
    }
};