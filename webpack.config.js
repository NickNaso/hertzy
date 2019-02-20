'use strict'

const path = require('path')

module.exports = {
    target: 'web',
    // mode: 'production',
    entry: './index.js',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
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
