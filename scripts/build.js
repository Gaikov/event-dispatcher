import fs from "fs-extra";

const DIST = "./dist";
const SRC = "src";
const PACKAGE = "package.json";

export function clean() {
    console.log("...cleaning");
    fs.removeSync("./dist");
}

export function postBuild() {
    console.log("...copying package.json");
    fs.copySync(`./${PACKAGE}`, `${DIST}/${PACKAGE}`, {});
    console.log("...copying sources");
    fs.copySync(`./${SRC}`, `${DIST}/${SRC}`, {});
}