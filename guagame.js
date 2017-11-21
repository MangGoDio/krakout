const GuaGame = () => {
    const g = {
        actions: {},
        keydowns: {}
    }

    g.canvas = document.querySelector('#id-canvas')
    g.context = g.canvas.getContext('2d')

    // draw
    g.drawImage = (guaImage) => {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }

    // events
    window.addEventListener('keydown', (e) => {
        g.keydowns[e.key] = true
    })

    window.addEventListener('keyup', (e) => {
        g.keydowns[e.key] = false
    })

    // 按钮注册事件
    g.registerAction = (keyCode, callback) => {
        g.actions[keyCode] = callback
    }

    window.fps = 30
    const runLoop = () => {

        // events
        const actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let keyCode = actions[i]
            if (g.keydowns[keyCode]) {
                // 如果按键被按下，调用注册的action
                g.actions[keyCode]()
            }
        }
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()
        setTimeout(() => {
            runLoop()
        }, 1000 / window.fps)
    }

    // timer
    setTimeout(() => {
        runLoop()
    }, 1000 / window.fps)

    return g
}
