// 球
const Ball = () => {
    const image = imageFromPath('ball.png')
    const o = {
        image,
        x: 100,
        y: 200,
        speedX: 10,
        speedY: 10,
        fired: false,
        move: () => {
            if (o.fired) {
                if (o.x < 0 || o.x > 400) o.speedX *= -1
                if (o.y < 0 || o.y > 300) o.speedY *= -1
                o.x += o.speedX
                o.y += o.speedY
            }
        },
        fire: () => o.fired = true,
        反弹: () => o.speedY *= -1,
    }
    return o
}