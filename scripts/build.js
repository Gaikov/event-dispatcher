const fs = require("fs-extra");

const DIST = "./dist";
const SRC = "src";
const PACKAGE = "package.json";

function clean() {
    console.log("...cleaning");
    fs.removeSync("./dist");
}

function postBuild() {
    console.log("...copying package.json");
    fs.copySync(`./${PACKAGE}`, `${DIST}/${PACKAGE}`, {});
    console.log("...copying sources");
    fs.copySync(`./${SRC}`, `${DIST}/${SRC}`, {});
}

module.exports = {
    clean,
    postBuild
}