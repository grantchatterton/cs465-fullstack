/**
 * Adapted from: https://github.com/wrchipman/cs465-travlr/blob/module4/.seedgooserc.js
 */
// .seedgooserc.js
module.exports = {
    modelBaseDirectory: "app_server/models", // model directory name
    models: ["*.js", "!db.js"], // model matcher
    data: "data", // data directory name
    db: "mongodb://localhost:27017/travlr", // db connection url
};