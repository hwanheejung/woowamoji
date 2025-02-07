import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'

const DURATION = 1200
const MIN_ROTATION = -10 // deg
const MAX_ROTATION = 10

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

type Wobbler = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => () => void

const createWobbler = (): Wobbler => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION // 0 ~ 1

    // ease-in-out
    const rotation =
      MIN_ROTATION +
      (MAX_ROTATION - MIN_ROTATION) *
        (0.5 + 0.5 * Math.sin(progress * Math.PI * 2))

    renderFrame(context, canvasSize, {
      ...frameOptions,
      rotation,
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

const wobble = createWobbler()

export default wobble
