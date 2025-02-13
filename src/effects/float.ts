import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'
import { EffectArgs } from '.'

const DURATION = 2000

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

const createFloater = (): EffectArgs => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION

    const FLOAT_RANGE = canvasSize / 4 // 위아래 이동 범위

    const floatY = FLOAT_RANGE * Math.sin(progress * Math.PI * 2)

    renderFrame(context, canvasSize, {
      ...frameOptions,
      position: { x: 0, y: floatY },
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

const float = createFloater()

export default float
