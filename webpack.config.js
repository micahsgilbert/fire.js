const webpack = require('webpack')
path = require('path')

const APP_DIR = path.resolve(__dirname + "/src")
const BUILD_DIR = path.resolve(__dirname + "/build")

module.exports = browserConfig = {
    entry: APP_DIR + "/fire.js",
    output: {
        path: BUILD_DIR,
        filename: "fire.js"
    }
}