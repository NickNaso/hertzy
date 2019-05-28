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
            dir: 'esm',
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
            dir: 'umd',
            format: 'umd',
            name: 'Hertzy',
            esModule: false,
            sourcemap: true
        }
    },
    {
        input: 'index.js',
        plugins: [
            json()
        ],
        output: {
            dir: 'cjs',
            format: 'cjs',
            esModule: false
        }
    }
]
