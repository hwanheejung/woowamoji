import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { EffectArgs } from '.'
import { EFFECT_SETTINGS } from '@/constants'
import { RefObject } from 'react'
import { Timer } from '@/utils/types'

const { MIN_ROTATION, MAX_ROTATION, FRAME_COUNT, FRAME_INTERVAL } =
  EFFECT_SETTINGS['wobble']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  frameIndex: number
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  savedFramesRef: RefObject<ImageData[]>
}

const createWobbler = (): EffectArgs => {
  let timer: Timer = null

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      frameIndex,
      addFrameToBuffer,
      savedFramesRef,
    } = props

    // 프레임 진행률 계산
    const progress = frameIndex / FRAME_COUNT
    const rotation =
      MIN_ROTATION +
      (MAX_ROTATION - MIN_ROTATION) *
        (0.5 + 0.5 * Math.sin(progress * Math.PI * 2))

    // 캔버스 렌더링
    renderFrame(context, canvasSize, { ...frameOptions, rotation })

    // 프레임 저장
    if (savedFramesRef.current.length < FRAME_COUNT) {
      addFrameToBuffer(context)
    }

    // 다음 프레임 실행
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
      frameIndex: 0,
      addFrameToBuffer,
      savedFramesRef,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}
const wobble = createWobbler()

export default wobble
