// 砖块

const Block = (game, position) => {
    // position 是 [0, 0]格式
    const p = position,
        o = game.imageByName('block')
    o.x = p[0]
    o.y = p[1]
    o.alive = true
    o.lifes = p[2] || 1
    o.kill = () => {
        o.lifes--
        if (o.lifes < 1) o.alive = false
    }
    o.collide = b => o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    return o
}

