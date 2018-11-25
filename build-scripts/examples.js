const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("./base");

module.exports = {
    ...baseConfig,
    mode: "development",
    entry: path.resolve(__dirname, "../examples/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../dist/examples"),
        filename: "bundle.js"
    },
    devtool: "sourcemap",
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../examples/Template.html")
        })
    ]
};
