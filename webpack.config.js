'use strict'

const path = require('path')
const Minify = require('uglifyjs-webpack-plugin')

module.exports = {
    target: 'web',
    mode: 'production',
    entry: [
        // '@babel/polyfill',
        'core-js/features/set',
        'core-js/features/map',
        'core-js/features/symbol',
        './index.js'
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    optimization: {
        minimizer: [
            new Minify({
                sourceMap: true,
            })
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hertzy.js',
        sourceMapFilename: 'hertzy.map',
        library: 'Hertzy',
        libraryTarget: 'umd'
    },
    node: {
        events: true
    },
    devtool: 'source-map'
}
