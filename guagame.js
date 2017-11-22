const GuaGame = (images, runCallback) => {
    // loads是一个对象，里面是图片的名字
    // 图片会在所有图片载入成功后运行
    const g = {
        actions: {},
        keydowns: {},
        images: {},
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

    const loads = []

    const names = Object.keys(images)
    for (let i = 0, dio = names.length; i < dio; i++) {
        const name = names[i]
        let img = new Image()
        img.src = images[name]
        img.onload = () => {
            // 所有图片载入成功，调用run
            g.images[name] = img
            loads.push(1)
            if (loads.length === names.length) g.run()
        }
    }

    g.imageByName = name => {
        const img = g.images[name]
        return {
            w: img.width,
            h: img.height,
            image: img,
        }
    }

    g.run = () => {
        runCallback(g)
        setTimeout(() => {
            runLoop()
        }, 1000 / window.fps)
    }

    // timer


    return g
}
