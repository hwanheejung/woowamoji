import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { FRAME_COUNT, FRAME_INTERVAL } = EFFECT_SETTINGS['blink']
interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  visible: boolean
  savedFramesRef: RefObject<ImageData[]>
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
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

    if (savedFramesRef.current.length < FRAME_COUNT) {
      addFrameToBuffer(context)
    }

    timer = setTimeout(
      () =>
        animate({
          ...props,
          visible: !visible,
        }),
      FRAME_INTERVAL,
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
      savedFramesRef,
      addFrameToBuffer,
      visible: true,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const blink = createBlinker()

export default blink
