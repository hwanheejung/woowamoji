import { useFrame } from '@/contexts/FrameContext'
import { useGif } from '@/contexts/GifContext'
import {
  EffectArgs,
  blink,
  bounce,
  float,
  oneByOne,
  pulse,
  shake,
  slideX,
  spin,
  wobble,
} from '@/effects'
import renderFrame from '@/graphics/renderFrame'
import ensure from '@/utils/ensure'
import { useCallback, useMemo, useRef } from 'react'

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
  canvasSize: number,
) => {
  const { text, fontFamily, color, effect } = useFrame()
  const effectCleanupRef = useRef<(() => void) | null>(null)
  const { savedFramesRef, addFrameToBuffer, clearFrameBuffer } = useGif()

  const frameOptions = useMemo(
    () => ({ text, fontFamily, color, effect }),
    [text, fontFamily, color, effect],
  )

  const effectHandlers = useMemo<Record<string, EffectArgs>>(
    () => ({
      blink,
      pulse,
      wobble,
      spin,
      float,
      shake,
      bounce,
      oneByOne,
      slideX,
    }),
    [],
  )

  // 효과 적용 함수
  const applyEffect = useCallback(() => {
    effectCleanupRef.current?.()
    effectCleanupRef.current = null

    const ctx = ensure(contextRef.current)

    // 저장된 프레임 초기화
    clearFrameBuffer()

    // 효과 적용
    if (effect === 'none') {
      renderFrame(ctx, canvasSize, frameOptions)
      addFrameToBuffer(ctx)
    } else {
      effectCleanupRef.current =
        effectHandlers[effect]?.(
          ctx,
          canvasSize,
          frameOptions,
          savedFramesRef,
          addFrameToBuffer,
        ) ?? null
    }
  }, [
    contextRef,
    effect,
    frameOptions,
    effectHandlers,
    addFrameToBuffer,
    clearFrameBuffer,
    canvasSize,
    savedFramesRef,
  ])

  return { frameOptions, applyEffect }
}
