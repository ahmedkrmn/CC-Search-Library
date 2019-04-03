/* global __dirname, require, module*/

const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");

let libraryName = pkg.name;

let outputFile, mode;

if (env === "build") {
  mode = "production";
  outputFile = libraryName + ".min.js";
} else {
  mode = "development";
  outputFile = libraryName + ".js";
}

const config = {
  mode, // Sets the value of mode to production OR development
  entry: __dirname + "/lib/catalog.js",
  devtool: "inline-source-map",
  output: {
    path: __dirname + "/dist",
    filename: outputFile,
    library: "catalog",
    libraryTarget: "umd",
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  }
};

module.exports = config;
