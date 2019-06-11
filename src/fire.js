'use strict'

import noise from './perlin.js'
export var config
var tiles = []

var canvas
var parentDiv
var ctx

var configReadyCallback = () => {}

window.onload = (() => {
    let cached_onload = window.onload
    return () => {
        init()
        if (cached_onload != null) {
            cached_onload.apply(this, arguments)
        }
    }
})()

window.onresize = (() => {
    let cached_resize = window.onresize
    return () => {
        handleSizeChange()
        if (cached_resize != null) {
            cached_resize.apply(this, arguments)
        }
    }
})()

export function handleSizeChange() {
    canvas.width = parentDiv.clientWidth
    canvas.height = parentDiv.clientHeight
    updateDimensions()
}

export function updateDimensions() {
    tiles = []
    for (let x = 0; x < canvas.width; x += config.tiles.width) {
        let row = []
        for (let y = 0; y < canvas.height; y += config.tiles.height) {
            row.push(new Tile(x, y))
        }
        tiles.push(row)
    }
}

function rgbToHex(rgb) {
    rgb = Math.min(255, rgb)
    var hex = Number(rgb).toString(16).substr(0, 2);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function getColor(val) {
    const r = val * config.colors.r.multiplier + config.colors.r.initial
    const g = val * config.colors.g.multiplier + config.colors.g.initial
    const b = val * config.colors.g.multiplier + config.colors.b.initial
    return `#${rgbToHex(r)}${rgbToHex(g)}${rgbToHex(b)}`
}

class Tile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.value = 0
    }
    show() {
        ctx.fillStyle = getColor(getNoise(this.x, this.y, performance.now()))
        ctx.fillRect(this.x, this.y, config.tiles.width, config.tiles.height)
    }
}

function getNoise(x, y, t) {
    return 0.5 + (noise.perlin3(x/config.noiseResolution, y/config.noiseResolution, t/config.speed))/2
}

function fetchConfig(callback) {
    fetch("fire.json").then(res => {
        res.json().then((r) => {
            config = r
            callback()
            configReadyCallback()
        })
    })
}

export function onConfigReady(fn) {
    configReadyCallback = fn
}

function init() {
    noise.seed(Math.random())
    fetchConfig(() => {
        canvas = document.createElement("canvas")
        parentDiv = document.getElementById(config.id)
        parentDiv.appendChild(canvas)
        handleSizeChange()
        ctx = canvas.getContext('2d')
        updateDimensions()
        setInterval(main, 10)
    })
}

function main() {
    for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[x].length; y++) {
            tiles[x][y].show(ctx)
        }
    }
}