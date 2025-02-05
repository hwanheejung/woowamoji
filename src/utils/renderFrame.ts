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
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context is not available')
  return ctx
}

const applyBackground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  backGroundColor?: string,
) => {
  if (backGroundColor) {
    ctx.fillStyle = backGroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
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

  const textMetrics = ctx.measureText(text)
  const textWidth = textMetrics.width
  const textHeight =
    textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent

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
  text: string,
  fontFamily: string,
  canvas: HTMLCanvasElement,
) => {
  adjustFontSizeToFit(ctx, text, fontFamily, canvas.width)

  // 중앙 정렬
  ctx.textAlign = 'center' // horizontal
  ctx.textBaseline = 'middle' // vertical

  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

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

const renderFrame: RenderFrame = (args) => {
  const {
    canvas,
    text,
    fontFamily = 'euljiro',
    color = '#000000',
    backGroundColor = '#ffffff',
    position = { x: 0, y: 0 },
    opacity = 1,
    rotation = 0,
    scale = 1,
  } = args

  const ctx = getContext(canvas)
  ctx.save()

  applyBackground(ctx, canvas, backGroundColor)
  applyStyles(ctx, color, opacity, position, rotation, scale)

  const metrics = renderCenteredText(ctx, text, fontFamily, canvas)

  const dimensions = calculateDimensions(position, metrics)
  ctx.restore()

  return dimensions
}

export default renderFrame
