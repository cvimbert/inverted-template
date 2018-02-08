var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: './index.ts',
    output: {
        filename: "./dist/reverted-template.umd.js",
        libraryTarget: 'umd',
        library: "RevertedTemplate"
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