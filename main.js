const loadLevel = (game, n) => {
    let blocks = []
    const level = levels[n - 1]
    for (let i = 0, dio = level.length; i < dio; i++) {
        // 设置block坐标
        let b = Block(game, level[i])
        blocks.push(b)
    }
    return blocks
}

let blocks = []

const enableDebugMode = (game, enable) => {
    if (!enable) return
    window.paused = false
    window.addEventListener('keydown', (e) => {
        const num = Number(e.key)
        if (e.key === 'p') window.paused = !window.paused
        if (typeof num === 'number' && num > 0) blocks = loadLevel(game, num)
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', (e) => {
        window.fps = Number(e.target.value)
    })
}

const __main = () => {


    const images = {
        ball: 'ball.png',
        block: 'block.png',
        paddle: 'paddle.png',
    }

    const game = GuaGame(images, (g) => {
        const paddle = Paddle(game)
        const ball = Ball(game)

        let score = 0

        blocks = loadLevel(game, 1)

        game.registerAction('a', () => paddle.moveLeft())

        game.registerAction('d', () => paddle.moveRight())

        game.registerAction('f', () => ball.fire())

        game.update = () => {
            if (window.paused) return
            ball.move()
            // 判断相撞
            if (paddle.collide(ball)) {
                ball.反弹()
            }
            // 判断打击砖块
            for (let i = 0, dio = blocks.length; i < dio; i++) {
                let block = blocks[i]
                if (block.collide(ball)) {
                    block.kill()
                    ball.反弹()
                    score += 100
                }
            }
        }

        let enableDrag = false
        game.canvas.addEventListener('mousedown', e => {
            const x = e.offsetX
            const y = e.offsetY
            // 检查是否点中了 ball
            if (ball.hasPoint(x, y)) {
                // 设置拖拽状态
                enableDrag = true
            }
        })
        game.canvas.addEventListener('mousemove', e => {
            const x = e.offsetX
            const y = e.offsetY
            // log(x, y, 'move')
            if (enableDrag) {
                ball.x = x
                ball.y = y
            }
        })
        game.canvas.addEventListener('mouseup', e => {
            const x = e.offsetX
            const y = e.offsetY
            enableDrag = false
        })

        game.draw = () => {
            // draw 背景
            game.context.fillStyle = '#888'
            game.context.fillRect(0, 0, 400, 300)
            // draw
            game.drawImage(paddle)
            game.drawImage(ball)
            // draw blocks
            for (let i = 0, dio = blocks.length; i < dio; i++) {
                let block = blocks[i]
                if (block.alive) game.drawImage(block)
            }
            // draw labels
            game.context.fillText(`分数：${score}`, 10, 290)
        }
    })

    enableDebugMode(game, true)

}

__main()