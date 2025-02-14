import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const DELAY = 500
const FRAMES_COUNT = 2

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  visible: boolean,
  savedFramesRef: RefObject<ImageData[]>,
  frameBuffer: (ctx: CanvasRenderingContext2D, canvasSize: number) => void,
) => void

const createBlinker = (): EffectArgs => {
  let timer: Timer = null

  const animate: Animate = (
    context,
    canvasSize,
    frameOptions,
    visible,
    savedFramesRef,
    addFrameToBuffer,
  ) => {
    renderFrame(context, canvasSize, {
      ...frameOptions,
      opacity: visible ? 1 : 0,
    })

    if (savedFramesRef.current.length < FRAMES_COUNT) {
      addFrameToBuffer(context, canvasSize)
    }

    timer = setTimeout(
      () =>
        animate(
          context,
          canvasSize,
          frameOptions,
          !visible,
          savedFramesRef,
          addFrameToBuffer,
        ),
      DELAY,
    )
  }

  return (
    context,
    canvasSize,
    frameOptions,
    savedFramesRef,
    addFrameToBuffer,
  ) => {
    if (timer) clearTimeout(timer)
    animate(
      context,
      canvasSize,
      frameOptions,
      true,
      savedFramesRef,
      addFrameToBuffer,
    )

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const blink = createBlinker()

export default blink
