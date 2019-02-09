const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./base");

module.exports = {
    ...config,
    mode: "development",
    entry: path.resolve(__dirname, "../docs/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../lib/docs"),
        filename: "bundle.js"
    },
    devtool: "sourcemap",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../docs/template.html")
        })
    ]
};
