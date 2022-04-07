const fs = require("fs-extra");

const DIST = "./dist";
const PACKAGE = "package.json";

function clean() {
    console.log("...cleaning");
    fs.removeSync("./dist");
}

function postBuild() {
    console.log("...prepare build");
    fs.copySync(`./${PACKAGE}`, `${DIST}/${PACKAGE}`, {});
}

module.exports = {
    clean,
    postBuild
}