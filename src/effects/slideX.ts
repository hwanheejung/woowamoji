import renderFrame from '@/utils/renderFrame'
import { EffectArgs } from '.'

const SPEED = 50 // 초당 이동 속도 (px/sec)

const createSlider = (): EffectArgs => {
  let timer: number | null = null

  const animate = (
    context: CanvasRenderingContext2D,
    canvasSize: number,
    frameOptions: { text?: string },
    x: number,
    text: string,
    fontSize: number,
  ) => {
    const { width } = renderFrame(context, canvasSize, {
      ...frameOptions,
      fontSize,
      text,
      position: { x, y: 0 },
    })

    // 다음 위치 계산
    const nextX = x - SPEED / 60 // 60FPS 기준 속도

    // 왼쪽 끝을 넘어가면 다시 오른쪽에서 시작
    const resetX = canvasSize + canvasSize / 4
    const newX = nextX < -width - canvasSize / 2 ? resetX : nextX

    timer = requestAnimationFrame(() =>
      animate(context, canvasSize, frameOptions, newX, text, fontSize),
    )
  }

  return (context, canvasSize, frameOptions) => {
    if (timer) cancelAnimationFrame(timer)

    const text = frameOptions.text || ''
    if (!text) return

    // 한 글자의 크기 계산 (첫 번째 글자로 측정)
    const { fontSize } = renderFrame(context, canvasSize, {
      ...frameOptions,
      text: text[0],
    })

    // 첫 번째 글자부터 시작
    animate(context, canvasSize, frameOptions, 0, text, fontSize)

    return () => {
      if (timer) cancelAnimationFrame(timer)
    }
  }
}

const slideX = createSlider()

export default slideX
