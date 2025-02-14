import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const DELAY = 500
const FRAMES_COUNT = 2

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  visible: boolean
  savedFramesRef: RefObject<ImageData[]>
  addFrameToBuffer: (ctx: CanvasRenderingContext2D, canvasSize: number) => void
}

const createBlinker = (): EffectArgs => {
  let timer: Timer = null

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      visible,
      savedFramesRef,
      addFrameToBuffer,
    } = props
    renderFrame(context, canvasSize, {
      ...frameOptions,
      opacity: visible ? 1 : 0,
    })

    if (savedFramesRef.current.length < FRAMES_COUNT) {
      addFrameToBuffer(context, canvasSize)
    }

    timer = setTimeout(
      () =>
        animate({
          ...props,
          visible: !visible,
        }),
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
    animate({
      context,
      canvasSize,
      frameOptions,
      visible: true,
      savedFramesRef,
      addFrameToBuffer,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const blink = createBlinker()

export default blink
