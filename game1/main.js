var loadLevel = function (n) {
    n = n - 1
    var blocks = []
    var level = levels[n]
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p)
        blocks.push(b)
    }
    return blocks
}

var blocks = []

var enableDebugMode = function (enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (k == 'p') {
            //暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            //为了debug临时加的载入关卡功能
            blocks = loadLevel(Number(k))
        }
    })
    //控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function () {
        var input = event.target
        window.fps = Number(input.value)
    })
}

var _main = function () {
    enableDebugMode(true)

    var score = 0

    var game = GuaGame(30)
    var paddle = Paddle()
    var ball = Ball()

    blocks = loadLevel(1)

    var paused = false
    game.registerAction('a', function () {
        paddle.moveLeft()
    })
    game.registerAction('d', function () {
        paddle.moveRight()
    })
    game.registerAction('f', function () {
        ball.fire()
    })


    //画面更新
    game.update = function () {
        if (window.paused) {
            return
        }
        ball.move()
        //判断相撞
        if (paddle.collide(ball)) {
            ball.fantan()
        }
        //判断ball和blocks相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 相撞')
                block.disappear()
                ball.fantan()
                //更新分数
                score += 100
            }
        }
    }

    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
        //draw blocks
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        //draw labels
        game.context.fillText('分数：' + score, 10, 290)
    }

}

_main()