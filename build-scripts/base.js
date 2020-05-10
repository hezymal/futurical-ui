const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: 'local',
                                exportGlobals: true,
                                localIdentName: '[local]__[hash:base64:8]',
                            }
                        }
                    },
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            Components: path.resolve(__dirname, "../src/Components"),
            Primitives: path.resolve(__dirname, "../src/Primitives"),
            Utils: path.resolve(__dirname, "../src/Utils")
        }
    }
};
