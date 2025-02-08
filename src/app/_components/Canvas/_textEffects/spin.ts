import { FrameRenderOptions } from '@/contexts/FrameContext'
import { renderFrame } from '../_utils'

const DURATION = 2000 // 한 바퀴 도는 시간
const FULL_ROTATION = 360 // 360도 회전

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

type Spinner = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => () => void

const createSpinner = (): Spinner => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION // 0 ~ 1

    const rotation = progress * FULL_ROTATION

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

const spin = createSpinner()

export default spin
