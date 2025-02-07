import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'

const DURATION = 300
const SHAKE_INTENSITY = 2 // 흔들리는 범위 (px)

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

type Shaker = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => () => void

const createShaker = (): Shaker => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION

    const shakeX =
      (Math.sin(progress * Math.PI * 10) + (Math.random() - 0.5) * 0.5) *
      SHAKE_INTENSITY

    renderFrame(context, canvasSize, {
      ...frameOptions,
      position: { x: shakeX, y: 0 },
    })

    timer = requestAnimationFrame(() =>
      animate(context, canvasSize, frameOptions, startTime),
    )
  }

  return (context, canvasSize, frameOptions) => {
    if (timer) cancelAnimationFrame(timer)
    const startTime = Date.now()
    animate(context, canvasSize, frameOptions, startTime)

    return () => {
      if (timer) cancelAnimationFrame(timer)
    }
  }
}

const shake = createShaker()

export default shake
