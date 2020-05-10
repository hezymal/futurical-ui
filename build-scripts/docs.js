const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./base");

module.exports = {
    ...config,
    mode: "development",
    entry: path.resolve(__dirname, "../src/Docs/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../docs"),
        filename: "bundle.js"
    },
    devtool: "sourcemap",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src/Docs/template.html")
        })
    ]
};
