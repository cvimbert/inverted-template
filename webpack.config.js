var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: './core/index.ts',
    output: {
        filename: "./dist/blip.umd.js",
        libraryTarget: 'umd',
        library: "Blip"
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts"],
        alias: {

        }
    },
    module: {
        loaders: [
            { test: /\.ts?$/, loader: "ts-loader" }
        ]
    }

};