// 球
const Ball = (game) => {
    const o = game.imageByName('ball')
    o.x = 100
    o.y = 200
    o.speedX = 10
    o.speedY = 10
    o.fired = false
    o.move = () => {
        if (o.fired) {
            if (o.x < 0 || o.x > 400) o.speedX *= -1
            if (o.y < 0 || o.y > 300) o.speedY *= -1
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = () => o.fired = true
    o.反弹 = () => o.speedY *= -1
    o.hasPoint = (x, y) => {
        const xIn = x >= o.x && x <= o.x + o.w
        const yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}