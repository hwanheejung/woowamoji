import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { FRAME_INTERVAL, MAX_FRAME_COUNT } = EFFECT_SETTINGS['oneByOne']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  text: string
  charIndex: number
  frameIndex: number
  frameCount: number
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  savedFramesRef: RefObject<ImageData[]>
}

const createOneByOne = (): EffectArgs => {
  let timer: Timer = null

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      text,
      charIndex,
      frameIndex,
      frameCount,
      addFrameToBuffer,
      savedFramesRef,
    } = props

    // 현재 글자만 표시
    renderFrame(context, canvasSize, { ...frameOptions, text: text[charIndex] })

    // 프레임 저장
    if (savedFramesRef.current.length < frameCount) {
      addFrameToBuffer(context)
    }

    // 다음 글자로 이동 (루프)
    const nextCharIndex = (charIndex + 1) % text.length
    const nextFrameIndex = frameIndex + 1

    // 다음 프레임 실행
    timer = setTimeout(() => {
      animate({
        ...props,
        charIndex: nextCharIndex,
        frameIndex: nextFrameIndex,
      })
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

    const text = frameOptions.text || ''
    const frameCount = Math.min(text.length, MAX_FRAME_COUNT)

    animate({
      context,
      canvasSize,
      frameOptions,
      text,
      charIndex: 0,
      frameIndex: 0,
      frameCount,
      addFrameToBuffer,
      savedFramesRef,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const oneByOne = createOneByOne()

export default oneByOne
