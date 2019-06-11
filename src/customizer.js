import { config, onConfigReady, updateDimensions } from "./fire.js"

function isColor(c) {
    for (var test of colorElems) {
        if (c == test) {
            return true
        }
    }
    return false
}

const colorElems = ["ri", "rm", "gi", "gm", "bi", "bm"]
const translate = {
    "i": "initial",
    "m": "multiplier",
    "tileWidth": "width",
    "tileHeight": "height",
    "noiseRes": "noiseResolution",
    "speed": "speed"
}
const allElems = [...colorElems, "tileWidth", "tileHeight", "noiseRes", "speed"]

onConfigReady(() => {
    document.getElementById("download").onclick = download
    for (var i of allElems) {
        document.getElementById(i).oninput = update("slider")
        document.getElementById(i + "-display").onkeyup = update("text")
    }
})

function download() {
    var hiddenElement = document.createElement('a')
    hiddenElement.href='data:attachment/text,' + encodeURI(JSON.stringify(config))
    hiddenElement.target = "_blank"
    hiddenElement.download = "fire.json"
    hiddenElement.click()
}

function update(inputType) {
    return () => {
        for (var i of allElems) {
            var value
            if (inputType == "slider") {
                value = document.getElementById(i).value
                document.getElementById(i + "-display").value = value
            }
            else {
                value = document.getElementById(i + "-display").value
                document.getElementById(i).value = value
            }
            if (isColor(i)) {
                config.colors[i.substr(0, 1)][translate[i.substr(1,1)]] = Number(value)
            }
            else if (i == "tileWidth" || i == "tileHeight") {
                config.tiles[translate[i]] = Math.max(1, Number(value))
                updateDimensions()
            } else {
                config[translate[i]] = Number(value)
            }
        }
    }
}