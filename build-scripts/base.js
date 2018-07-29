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
                    "typings-for-css-modules-loader?modules&namedExport&localIdentName='[local]__[hash:base64:8]'",
                    "sass-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
};
