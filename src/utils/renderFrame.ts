interface CanvasContext {
  context: CanvasRenderingContext2D
  canvasSize: number
}

interface RenderOptions {
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

type RenderFrame = (
  context: CanvasContext,
  options: RenderOptions,
) => Dimensions

const applyBackground = (
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  backGroundColor?: string,
) => {
  if (backGroundColor) {
    ctx.fillStyle = backGroundColor
    ctx.fillRect(0, 0, canvasSize, canvasSize)
  } else {
    ctx.clearRect(0, 0, canvasSize, canvasSize)
  }
}

const applyStyles = (
  ctx: CanvasRenderingContext2D,
  color: string,
  opacity: number,
  position: { x: number; y: number },
  rotation: number,
  scale: number,
) => {
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.translate(position.x, position.y)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.scale(scale, scale)
}

const adjustFontSizeToFit = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontFamily: string,
  canvasSize: number,
) => {
  // 초기 폰트 크기 설정
  let fontSize = 50
  ctx.font = `${fontSize}px ${fontFamily}`

  const metrics = ctx.measureText(text)
  const textWidth = metrics.width
  const textHeight =
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

  // 비율 계산
  const widthScale = canvasSize / textWidth
  const heightScale = canvasSize / textHeight

  // 더 작은 스케일 선택
  const scaleFactor = Math.min(widthScale, heightScale)
  fontSize = Math.floor(fontSize * scaleFactor)

  // 최종 폰트 적용
  ctx.font = `${fontSize}px ${fontFamily}`
}

const renderCenteredText = (
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  text: string,
  fontFamily: string,
) => {
  adjustFontSizeToFit(ctx, text, fontFamily, canvasSize)

  // 중앙 정렬
  ctx.textAlign = 'center' // horizontal
  ctx.textBaseline = 'middle' // vertical

  ctx.fillText(text, canvasSize / 2, canvasSize / 2)

  return ctx.measureText(text)
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

const renderFrame: RenderFrame = ({ context, canvasSize }, options) => {
  const {
    text,
    fontFamily = 'euljiro',
    color = '#000000',
    backGroundColor = '#ffffff',
    position = { x: 0, y: 0 },
    opacity = 1,
    rotation = 0,
    scale = 1,
  } = options

  context.save()

  applyBackground(context, canvasSize, backGroundColor)
  applyStyles(context, color, opacity, position, rotation, scale)

  const metrics = renderCenteredText(context, canvasSize, text, fontFamily)
  const dimensions = calculateDimensions(position, metrics)

  context.restore()

  return dimensions
}

export default renderFrame
