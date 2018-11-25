const path = require("path");
const fs = require("fs");

config = {
    entry: path.join(__dirname, "../src/index.js"),
    output: {
        path: path.join(__dirname, "../dist"),
        filename: "index.js"
    }
};

function makeBootstrapScript(config) {
    fs.createReadStream(config.entry).pipe(
        fs.createWriteStream(
            path.join(config.output.path, config.output.filename)
        )
    );
}

makeBootstrapScript(config);
