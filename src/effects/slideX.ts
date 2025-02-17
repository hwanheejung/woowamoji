import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { JUMP, FRAME_INTERVAL } = EFFECT_SETTINGS['slideX']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  x: number
  firstLetterWidth: number
  text: string
  fontSize: number
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  savedFramesRef: RefObject<ImageData[]>
}

const createSlider = (): EffectArgs => {
  let timer: Timer = null
  let saved = false

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      x,
      firstLetterWidth,
      text,
      fontSize,
      addFrameToBuffer,
      savedFramesRef,
    } = props

    const { x: currentX, width } = renderFrame(context, canvasSize, {
      ...frameOptions,
      fontSize,
      text: `${text}${text.slice(0, 1)}`,
      position: { x, y: 0 },
    })

    let nextX = x

    if (currentX + width - firstLetterWidth - JUMP * 3 <= 0) {
      nextX = 0
      saved = true
    } else {
      nextX -= JUMP
    }

    // 프레임 저장
    if (!saved || savedFramesRef.current.length === 0) {
      addFrameToBuffer(context)
    }

    // 다음 프레임 실행
    timer = setTimeout(() => {
      animate({ ...props, x: nextX })
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
    saved = false

    const text = frameOptions.text || ''
    if (!text) {
      renderFrame(context, canvasSize, frameOptions)
      return
    }

    // 첫 번째 글자의 크기 계산
    const { fontSize, width } = renderFrame(context, canvasSize, {
      ...frameOptions,
      text: text[0],
    })

    // 첫 번째 위치부터 시작
    animate({
      context,
      canvasSize,
      frameOptions,
      x: 0,
      firstLetterWidth: width,
      text,
      fontSize,
      addFrameToBuffer,
      savedFramesRef,
    })

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}

const slideX = createSlider()

export default slideX
