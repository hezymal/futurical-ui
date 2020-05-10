if (process.env.NODE_ENV === "production") {
    module.exports = require("./borderlands-ui.production.js");
} else {
    module.exports = require("./borderlands-ui.development.js");
}
