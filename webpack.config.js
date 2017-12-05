var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'c2tpl.js',
        library: 'C2tpl',
        libraryTarget: 'umd'
    },
    node: {
        fs: "empty"
    }
}