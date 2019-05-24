const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const nodeResolveBuiltins = require('rollup-plugin-node-builtins')
const json = require('rollup-plugin-json')
const { terser } = require('rollup-plugin-terser')

module.exports = [
    {
        input: 'index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            json(),
            nodeResolveBuiltins(),
            nodeResolve(),
            commonjs()
        ],
        output: {
            file: './dist/esm/index.js',
            format: 'esm'
        }
    },
    {
        input: 'index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            json(),
            nodeResolveBuiltins(),
            nodeResolve(),
            commonjs(),
            terser()
        ],
        output: {
            file: './dist/umd/index.js',
            format: 'umd',
            name: 'Hertzy',
            esModule: false
        }
    },
    /* {
        input: 'index.js',
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            json(),
            // nodeResolveBuiltins(),
            // nodeResolve(),
            // commonjs(),
            // terser()
        ],
        output: {
            file: './dist/cjs/index.js',
            format: 'cjs',
            esModule: false
        }
    } */
]
