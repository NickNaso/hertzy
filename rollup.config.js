import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import nodeResolveBuiltins from 'rollup-plugin-node-builtins'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'

export default [
    {
        input: 'index.js',
        plugins: [
            json(),
            nodeResolveBuiltins(),
            commonjs()
        ],
        output: {
            file: './esm/index.js',
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
            file: './umd/index.js',
            format: 'umd',
            name: 'Hertzy',
            esModule: false,
            sourcemap: true
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
