import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { FRAME_COUNT, FRAME_INTERVAL, SHAKE_INTENSITY } =
  EFFECT_SETTINGS['shake']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  frameIndex: number
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  savedFramesRef: RefObject<ImageData[]>
}

const createShaker = (): EffectArgs => {
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

    // 프레임 진행률 계산 (0 ~ 1)
    const progress = frameIndex / FRAME_COUNT
    const shakeX =
      (Math.sin(progress * Math.PI * 10) + (Math.random() - 0.5) * 0.5) *
      SHAKE_INTENSITY

    // 캔버스 렌더링
    renderFrame(context, canvasSize, {
      ...frameOptions,
      position: { x: shakeX, y: 0 },
    })

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

const shake = createShaker()

export default shake
