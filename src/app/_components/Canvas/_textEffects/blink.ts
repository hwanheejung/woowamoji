import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/utils/renderFrame'
import { Timer } from '@/utils/types'

const DELAY = 500

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  visible: boolean,
) => void

type Blinker = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => () => void

const createBlinker = (): Blinker => {
  let timer: Timer = null
  const animate: Animate = (context, canvasSize, frameOptions, visible) => {
    renderFrame(context, canvasSize, {
      ...frameOptions,
      opacity: visible ? 1 : 0,
    })

    timer = setTimeout(
      () => animate(context, canvasSize, frameOptions, !visible),
      DELAY,
    )
  }

  return (context, canvasSize, frameOptions) => {
    if (timer) clearTimeout(timer)
    animate(context, canvasSize, frameOptions, true)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const blink = createBlinker()

export default blink
