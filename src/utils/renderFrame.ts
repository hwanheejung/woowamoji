interface Arguments {
  canvas: HTMLCanvasElement
  text: string
  fontFamily?: string
  color?: string
  backGroundColor?: string
  position?: { x: number; y: number }
  opacity?: number
  rotation?: number
  scale?: number
}

interface Dimensions {
  x: number
  y: number
  width: number
  height: number
}

type RenderFrame = (args: Arguments) => Dimensions

const getContext = (canvas: HTMLCanvasElement): CanvasRenderingContext2D => {
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas context is not available')
  return context
}

const applyBackground = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  backGroundColor?: string,
) => {
  if (backGroundColor) {
    context.fillStyle = backGroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}

const applyStyles = (
  context: CanvasRenderingContext2D,
  fontFamily: string,
  color: string,
  opacity: number,
  position: { x: number; y: number },
  rotation: number,
  scale: number,
) => {
  context.globalAlpha = opacity
  context.font = fontFamily
  context.fillStyle = color
  context.translate(position.x, position.y)
  context.rotate((rotation * Math.PI) / 180)
  context.scale(scale, scale)
}

const renderText = (
  context: CanvasRenderingContext2D,
  text: string,
): TextMetrics => {
  context.fillText(text, 0, 0)
  return context.measureText(text)
}

const calculateDimensions = (
  position: { x: number; y: number },
  metrics: TextMetrics,
): Dimensions => {
  const width = metrics.width
  const height =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
  return {
    x: position.x,
    y: position.y - metrics.actualBoundingBoxAscent,
    width,
    height,
  }
}

const renderFrame: RenderFrame = (args) => {
  const {
    canvas,
    text,
    fontFamily = '16px Arial',
    color = '#000000',
    backGroundColor = '#ffffff',
    position = { x: 0, y: 0 },
    opacity = 1,
    rotation = 0,
    scale = 1,
  } = args

  const context = getContext(canvas)

  context.save()

  applyBackground(context, canvas, backGroundColor)
  applyStyles(context, fontFamily, color, opacity, position, rotation, scale)
  const metrics = renderText(context, text)
  const dimensions = calculateDimensions(position, metrics)

  context.restore()

  return dimensions
}

export default renderFrame
