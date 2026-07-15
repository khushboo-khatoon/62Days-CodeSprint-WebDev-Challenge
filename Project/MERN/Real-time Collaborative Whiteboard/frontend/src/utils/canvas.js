const COLORS = ['#0f766e', '#0284c7', '#c2410c', '#7c3aed', '#be123c', '#171717']

export function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)]
}

export function drawStroke(ctx, stroke) {
  if (!stroke?.points?.length) return

  ctx.save()
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.strokeStyle = stroke.tool === 'eraser' ? '#ffffff' : stroke.color
  ctx.lineWidth = stroke.tool === 'eraser' ? stroke.size * 3 : stroke.size
  ctx.globalCompositeOperation =
    stroke.tool === 'eraser' ? 'destination-out' : 'source-over'

  ctx.beginPath()
  const [first, ...rest] = stroke.points
  ctx.moveTo(first.x, first.y)
  rest.forEach((p) => ctx.lineTo(p.x, p.y))
  if (stroke.points.length === 1) {
    ctx.lineTo(first.x + 0.01, first.y + 0.01)
  }
  ctx.stroke()
  ctx.restore()
}

export function redrawAll(ctx, strokes, width, height) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  strokes.forEach((s) => drawStroke(ctx, s))
}
