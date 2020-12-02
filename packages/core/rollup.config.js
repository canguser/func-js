import resolve from 'rollup-plugin-node-resolve';

import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import {terser} from 'rollup-plugin-terser';

const {NODE_ENV = 'normal'} = process.env;
const pkg = require('./package') || {};
const {
    main = 'dist/index.js',
    mainMini = 'dist/index.mini.js',
    module = 'dist/index.es.js',
    libName = '$func'
} = pkg;

const isESM = ['esm'].includes(NODE_ENV);
const isProd = ['prod'].includes(NODE_ENV);
const usingBabel = ['prod', 'normal'].includes(NODE_ENV);

const fileMapper = {
    esm: module,
    prod: mainMini,
    normal: main
};

export default {
    input: './main/index.js',
    output: {
        file: fileMapper[NODE_ENV] || main,
        format: isESM ? 'esm' : 'umd',
        name: libName
    },
    plugins: [
        resolve(),
        commonjs(),
        ...usingBabel ? [babel(
            {
                exclude: 'node_modules/**', // 防止打包node_modules下的文件
                runtimeHelpers: true,       // 使plugin-transform-runtime生效
            }
        )] : [],
        ...isProd ? [terser()] : []
    ]
}