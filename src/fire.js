'use strict'

import noise from './perlin.js'
var config
var tiles = []

window.onload = (() => {
    let cached_onload = window.onload
    return () => {
        init()
        if (cached_onload != null) {
            cached_onload.apply(this, arguments)
        }
    }
})()

function updateDimensions(canvas) {
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
    show(ctx) {
        ctx.fillStyle = getColor(getNoise(this.x, this.y, performance.now()))
        ctx.fillRect(this.x, this.y, config.tiles.width, config.tiles.height)
    }
}

function getNoise(x, y, t) {
    return 0.5 + (noise.perlin3(x/config.noiseResolution, y/config.noiseResolution, t/config.speed))/2
}

function getConfig(callback) {
    fetch("fire.json").then(res => {
        res.json().then((r) => {
            config = r
            callback()
        })
    })
}

function init() {
    noise.seed(Math.random())
    getConfig(() => {
        const canvas = document.getElementById(config.id)
        const ctx = canvas.getContext('2d')
        updateDimensions(canvas)
        setInterval(main, 10, ctx)
    })
}

function main(ctx) {
    for (let x = 0; x < tiles.length; x++) {
        for (let y = 0; y < tiles[x].length; y++) {
            tiles[x][y].show(ctx)
        }
    }
}