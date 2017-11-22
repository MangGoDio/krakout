
// 挡板
const Paddle = (game) => {
    const o = game.imageByName('paddle')

    const aInb = (a, b) => {
        let collide = true
        if (a.x > (b.x + b.w)) collide = false
        if ((a.x + a.w) < b.x) collide = false
        if (a.y > (b.y + b.h)) collide = false
        if ((a.y + a.h) < b.y) collide = false
        return collide
        //min(x1+w1, x2+w2) > max(x1,x2) && min(y1+h1, y2+h2) > min(y1,y2) 重叠部分的面积大于0
    }

    o.x = 100
    o.y = 250
    o.speed = 5
    o.move = x => {
        if (x < 0) x = 0
        if (x > 400 - o.w) x = 400 - o.w
        o.x = x
    }
    o.moveLeft = () => o.move(o.x -= o.speed)
    o.moveRight = () => o.move(o.x += o.speed)
    o.collide = ball => {
        return aInb(ball, o)
    }
    return o
}