import { useFrame } from '@/contexts/FrameContext'
import { blink, float, pulse, shake, spin, wobble } from '@/effects'
import renderFrame from '@/utils/renderFrame'
import { useCallback, useMemo, useRef } from 'react'

const CANVAS_SIZE = 50

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
) => {
  const { text, fontFamily, color, backGroundColor, effect } = useFrame()
  const effectCleanupRef = useRef<(() => void) | null>(null)

  const frameOptions = useMemo(
    () => ({ text, fontFamily, color, backGroundColor }),
    [text, fontFamily, color, backGroundColor],
  )

  const effectHandlers: Record<
    string,
    (
      ctx: CanvasRenderingContext2D,
      size: number,
      options: typeof frameOptions,
    ) => (() => void) | void
  > = {
    blink,
    pulse,
    wobble,
    spin,
    float,
    shake,
  }

  const applyEffect = useCallback(() => {
    // 이전 effect 정리
    effectCleanupRef.current?.()
    effectCleanupRef.current = null

    const ctx = contextRef.current
    if (!ctx) return

    if (effect === 'none') {
      renderFrame(ctx, CANVAS_SIZE, frameOptions)
    } else {
      effectCleanupRef.current =
        effectHandlers[effect]?.(ctx, CANVAS_SIZE, frameOptions) ?? null
    }
  }, [contextRef, effect, frameOptions])

  return { applyEffect, effect, frameOptions }
}
