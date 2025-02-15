import { EFFECT_SETTINGS } from '@/constants'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import renderFrame from '@/graphics/renderFrame'
import { Timer } from '@/utils/types'
import { RefObject } from 'react'
import { EffectArgs } from '.'

const { SPEED, FRAME_COUNT_PER_WORD, FRAME_INTERVAL } =
  EFFECT_SETTINGS['slideX']

interface AnimateProps {
  context: CanvasRenderingContext2D
  canvasSize: number
  frameOptions: FrameRenderOptions
  x: number
  text: string
  fontSize: number
  frameIndex: number
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  savedFramesRef: RefObject<ImageData[]>
}

const createSlider = (): EffectArgs => {
  let timer: Timer = null

  const animate = (props: AnimateProps) => {
    const {
      context,
      canvasSize,
      frameOptions,
      x,
      text,
      fontSize,
      frameIndex,
      addFrameToBuffer,
      savedFramesRef,
    } = props

    const FRAME_COUNT = text.length * FRAME_COUNT_PER_WORD

    const { width } = renderFrame(context, canvasSize, {
      ...frameOptions,
      fontSize,
      text,
      position: { x, y: 0 },
    })

    // 다음 위치 계산
    const nextX = x - SPEED / FRAME_COUNT_PER_WORD

    // 왼쪽 끝을 넘어가면 다시 오른쪽에서 시작
    const resetX = canvasSize + canvasSize / 4
    const newX = nextX < -width - canvasSize / 2 ? resetX : nextX

    // 프레임 저장
    if (savedFramesRef.current.length < FRAME_COUNT) {
      addFrameToBuffer(context)
    }

    // 다음 프레임 실행
    timer = setTimeout(() => {
      animate({ ...props, x: newX, frameIndex: frameIndex + 1 })
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
    if (!text) return

    // 첫 번째 글자의 크기 계산
    const { fontSize } = renderFrame(context, canvasSize, {
      ...frameOptions,
      text: text[0],
    })

    // 첫 번째 위치부터 시작
    animate({
      context,
      canvasSize,
      frameOptions,
      x: 0,
      text,
      fontSize,
      frameIndex: 0,
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
