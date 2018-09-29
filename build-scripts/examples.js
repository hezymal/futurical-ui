const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base");

module.exports = {
    ...baseConfig,
    mode: "development",
    entry: path.resolve(__dirname, "../src/examples-index.tsx"),
    output: {
        path: path.resolve(__dirname, "../examples"),
        filename: "bundle.js"
    },
    devtool: "sourcemap",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src/Examples/Template.html")
        })
    ]
};
