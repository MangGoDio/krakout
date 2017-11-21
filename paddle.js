
// 挡板
const Paddle = () => {
    const image = imageFromPath('paddle.png')
    const o = {
        image,
        x: 100,
        y: 200,
        speed: 5,
        move: x => {
            if (x < 0) x = 0
            if (x > 400 - o.image.width) x = 400 - o.image.width
            o.x = x
        },
        moveLeft: () => o.move(o.x -= o.speed),
        moveRight: () => o.move(o.x += o.speed),
        collide: ball => {
            if (ball.y + ball.image.height > o.y && ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            } else {
                return false
            }
        }
    }
    return o
}