const e = sel => document.querySelector(sel)

const log = s => {
    //e('#id-text-log').value += `\n${s}`
    console.log.bind(console)
}

const imageFromPath = (path) => {
    let img = new Image()
    img.src = path
    return img
}

const rectIntersects = (a, b) => {
    const o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            return true
        }
    }
    return false
}