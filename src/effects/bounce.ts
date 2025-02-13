import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'
import { EffectArgs } from '.'

const DURATION = 1000 // 한 번 튀는 데 걸리는 시간

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  startTime: number,
) => void

const createBouncer = (): EffectArgs => {
  let timer: number | null = null

  const animate: Animate = (context, canvasSize, frameOptions, startTime) => {
    const elapsed = Date.now() - startTime
    const progress = (elapsed % DURATION) / DURATION

    // 천천히 올라가고 빠르게 내려오기
    const BOUNCE_HEIGHT = canvasSize / 2 // 최대 튀는 높이 (px)
    const bounceY =
      BOUNCE_HEIGHT * Math.abs(Math.cos(progress * Math.PI)) - canvasSize / 4

    renderFrame(context, canvasSize, {
      ...frameOptions,
      position: { x: 0, y: -bounceY },
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

const bounce = createBouncer()

export default bounce
