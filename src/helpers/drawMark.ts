export const drawMark = (src = null) => {
    const canvas = document.createElement('canvas')

    const fillColor = 'yellow'

    const imgSrc =
        src ??
        'https://blog.zigzag.lt/wp-content/uploads/pilis_gravensteen_belgija-360x240.jpg'

    if (!canvas) {
        return null
    }

    canvas.width = 200
    canvas.height = 300

    const ctx = canvas.getContext('2d')

    if (!ctx) {
        return null
    }

    ctx.beginPath()
    ctx.moveTo(46, 183)
    ctx.lineTo(100, 300)
    ctx.lineTo(154, 183)

    // the outline
    ctx.lineWidth = 1
    ctx.strokeStyle = '#666666'
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.arc(100, 100, 100, 0, 2 * Math.PI)
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#666666'
    ctx.stroke()
    ctx.closePath()

    // the triangle
    ctx.beginPath()
    ctx.moveTo(45, 180)
    ctx.lineTo(155, 180)
    ctx.lineTo(100, 300)
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.closePath()

    const make_base = () => {
        const base_image = new Image()
        base_image.src = imgSrc
        base_image.onload = () => {
            if (!ctx) {
                return null
            }

            ctx.save()
            ctx.beginPath()
            ctx.arc(100, 100, 80, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.clip()
            ctx.drawImage(base_image, 0, 0)
            ctx.beginPath()
            ctx.arc(100, 100, 80, 0, 2 * Math.PI)
            ctx.clip()
            ctx.closePath()
            ctx.restore()
        }
    }

    make_base()

    return { canvas, image: imgSrc }
}
