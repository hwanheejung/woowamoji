import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'

const DURATION = 1200
const MIN_SCALE = 0.92
const MAX_SCALE = 1.2

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

type Pulser = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => () => void

const createPulser = (): Pulser => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION // 0 ~ 1

    // ease-in-out
    const scale =
      MIN_SCALE +
      (MAX_SCALE - MIN_SCALE) * (0.5 + 0.5 * Math.sin(progress * Math.PI * 2))

    renderFrame(context, canvasSize, {
      ...frameOptions,
      scale,
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

const pulse = createPulser()

export default pulse
