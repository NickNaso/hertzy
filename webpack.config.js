'use strict'

const path = require('path')

module.exports = {
    target: 'web',
    mode: 'production',
    entry: './index.js',
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
