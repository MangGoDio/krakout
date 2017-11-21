// 砖块

const Block = position => {
    // position 是 [0, 0]格式
    const p = position,
        image = imageFromPath('block.png'),
        o = {
            image,
            x: p[0],
            y: p[1],
            w: 50,
            h: 20,
            alive: true,
            lifes: p[2] || 1,
            kill: () => {
                o.lifes--
                if (o.lifes < 1) o.alive = false
            },
            collide: b => o.alive && (rectIntersects(o, b) || rectIntersects(b, o)),
        }
    return o
}

