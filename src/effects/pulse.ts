import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { MIN_SCALE, MAX_SCALE, FRAME_COUNT, FRAME_INTERVAL } =
  EFFECT_SETTINGS['pulse']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  savedFramesRef: RefObject<ImageData[]>
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  frameIndex: number
}

const createPulser = (): EffectArgs => {
  let timer: Timer = null

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      savedFramesRef,
      addFrameToBuffer,
      frameIndex,
    } = props

    const progress = frameIndex / FRAME_COUNT // 0 ~ 1
    const scale =
      MIN_SCALE +
      (MAX_SCALE - MIN_SCALE) * (0.5 + 0.5 * Math.sin(progress * Math.PI * 2))

    renderFrame(context, canvasSize, {
      ...frameOptions,
      scale,
    })

    // 프레임 저장
    if (savedFramesRef.current.length < FRAME_COUNT) addFrameToBuffer(context)

    timer = setTimeout(() => {
      animate({ ...props, frameIndex: frameIndex + 1 })
    }, FRAME_INTERVAL)
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
      frameIndex: 0,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const pulse = createPulser()

export default pulse
