import { Timer } from '@/utils/types'
import { EffectArgs } from '.'
import { FrameRenderOptions } from '@/contexts/FrameContext'
import { renderFrame } from '../_utils'

const INTERVAL = 400

type Animate = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  text: string,
  index: number,
) => void

const createOneByOne = (): EffectArgs => {
  let timer: Timer | null = null

  const animate: Animate = (context, canvasSize, frameOptions, text, index) => {
    renderFrame(context, canvasSize, {
      ...frameOptions,
      text: text[index], // 현재 인덱스의 한 글자만 출력
    })

    const nextIndex = (index + 1) % text.length // 마지막 글자까지 가면 처음으로 반복

    timer = setTimeout(
      () => animate(context, canvasSize, frameOptions, text, nextIndex),
      INTERVAL,
    )
  }

  return (context, canvasSize, frameOptions) => {
    if (timer) clearTimeout(timer)

    const text = frameOptions.text || ''

    if (text.length === 1) {
      // 한 글자라면 즉시 renderFrame 실행 후 종료
      renderFrame(context, canvasSize, { ...frameOptions, text })
      return
    }

    if (text.length === 0) return // 빈 문자열이면 실행하지 않음

    animate(context, canvasSize, frameOptions, text, 0) // 첫 번째 글자부터 시작

    return () => {
      if (timer) clearTimeout(timer)
    }
  }
}
const oneByOne = createOneByOne()

export default oneByOne
