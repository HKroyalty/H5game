var Block = function (position) {
    //position 是[0,0]格式
    var p = position
    var image = imageFromPath('images/block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 80,
        h: 30,
        alive: true,
        lifes: p[2] || 1
    }
    o.disappear = function () {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function (b) {
        return o.alive && (rectIntersects(o, b) || rectIntersects(b, o))
    }
    return o
}