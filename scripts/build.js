const fs = require("fs-extra");

const DIST = "./dist";
const SRC = "src";
const PACKAGE = "package.json";
const README = "readme.md";

function clean() {
    console.log("...cleaning");
    fs.removeSync("./dist");
}

function postBuild() {
    console.log("...copying package.json");
    fs.copySync(`./${PACKAGE}`, `${DIST}/${PACKAGE}`, {});
    fs.copySync(`./${README}`, `${DIST}/${README}`, {});
    console.log("...copying sources");
    fs.copySync(`./${SRC}`, `${DIST}/${SRC}`, {});
}

module.exports = {
    clean,
    postBuild
}