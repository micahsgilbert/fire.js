let config = {
    r: {
        init: 0,
        mult: 0,
    },
    g: {
        init: 0,
        mult: 0,
    },
    b: {
        init: 0,
        mult: 0,
    }
}

function updateConfifg() {
    let color1 = document.getElementById("color1").value
    let color2 = document.getElementById("color2").value

    let r1 = parseInt(color1.substr(1, 2), 16)
    let g1 = parseInt(color1.substr(3, 2), 16)
    let b1 = parseInt(color1.substr(5, 2), 16)

    let r2 = parseInt(color2.substr(1, 2), 16)
    let g2 = parseInt(color2.substr(3, 2), 16)
    let b2 = parseInt(color2.substr(5, 2), 16)

    config.r.init = r1
    config.g.init = g1
    config.b.init = b1

    config.r.mult = r2 - r1
    config.g.mult = g2 - g1
    config.b.mult = b2 - b1

    showColor()
}

function showColor() {
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext('2d')

    for (let i = 0; i < 1; i += 0.01) {
        let r = config.r.init + config.r.mult * i
        let g = config.g.init + config.g.mult * i
        let b = config.b.init + config.b.mult * i

        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.fillRect(i * 500, 0, 5, 200)
    }

    document.getElementById("specs").innerHTML = `
    R initial: ${config.r.init}<br />
    R multiplier: ${config.r.mult}<br />
    <br />
    G initial: ${config.g.init}<br />
    G multiplier: ${config.g.mult}<br />
    <br />
    B initial: ${config.b.init}<br />
    B multiplier: ${config.b.mult}<br />
    <br />
    `
}

window.onload = () => {
    for (let picker of document.getElementsByTagName("input")) {
        picker.addEventListener("change", updateConfifg)
    }
    updateConfifg()
}