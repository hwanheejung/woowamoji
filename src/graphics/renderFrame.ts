import { FONT_ADJUSTMENT_RATIO, Font, TextColor } from '@/constants'
import {
  BackgroundRenderOptions,
  FrameRenderOptions,
} from '@/contexts/FrameContext'

interface Dimensions {
  x: number
  y: number
  width: number
  height: number
  fontSize: number
}

type RenderFrame = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  options: Omit<FrameRenderOptions, keyof BackgroundRenderOptions>,
) => Dimensions

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

  return { fontSize, metrics }
}

const renderText = (
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  text: string,
  fontFamily: string,
  fontSize: number,
) => {
  ctx.font = `${fontSize}px ${fontFamily}`

  const metrics = ctx.measureText(text)
  const adjust =
    metrics.actualBoundingBoxDescent * FONT_ADJUSTMENT_RATIO[fontFamily as Font]

  ctx.textAlign = 'start'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, canvasSize / 2 + adjust)
  return metrics
}

const renderCenteredText = (
  ctx: CanvasRenderingContext2D,
  canvasSize: number,
  text: string,
  fontFamily: string,
) => {
  const { metrics, fontSize } = adjustFontSizeToFit(
    ctx,
    text,
    fontFamily,
    canvasSize,
  )

  const adjust =
    metrics.actualBoundingBoxDescent * FONT_ADJUSTMENT_RATIO[fontFamily as Font]

  // 중앙 정렬
  ctx.textAlign = 'center' // horizontal
  ctx.textBaseline = 'middle' // vertical
  ctx.fillText(text, canvasSize / 2, canvasSize / 2 + adjust)

  return { metrics, fontSize }
}

const calculateDimensions = (
  position: { x: number; y: number },
  metrics: TextMetrics,
): Omit<Dimensions, 'fontSize'> => {
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

const renderFrame: RenderFrame = (context, canvasSize, options) => {
  const {
    text = '',
    fontFamily = Font.JUA,
    fontSize: givenFontSize = undefined,
    color = TextColor.BLACK,
    position = { x: 0, y: 0 },
    opacity = 1,
    rotation = 0,
    scale = 1,
  } = options

  context.clearRect(0, 0, canvasSize, canvasSize)
  context.save()

  context.translate(canvasSize / 2, canvasSize / 2) // 중심 이동
  applyStyles(context, color, opacity, position, rotation, scale)
  context.translate(-canvasSize / 2, -canvasSize / 2) // 원래 위치로 이동

  const { metrics, fontSize } = givenFontSize
    ? {
        metrics: renderText(
          context,
          canvasSize,
          text,
          fontFamily,
          givenFontSize,
        ),
        fontSize: givenFontSize,
      }
    : renderCenteredText(context, canvasSize, text, fontFamily)

  const dimensions = calculateDimensions(position, metrics)

  context.restore()

  return { fontSize, ...dimensions }
}

export default renderFrame
