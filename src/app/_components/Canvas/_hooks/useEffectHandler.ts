import { useFrame } from '@/contexts/FrameContext'
import { useCallback, useMemo, useRef } from 'react'
import {
  blink,
  bounce,
  float,
  pulse,
  shake,
  spin,
  wobble,
} from '../_textEffects'
import { renderFrame } from '../_utils'

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
  canvasSize: number,
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
    bounce,
  }

  const applyEffect = useCallback(() => {
    // 이전 effect 정리
    effectCleanupRef.current?.()
    effectCleanupRef.current = null

    const ctx = contextRef.current
    if (!ctx) return

    if (effect === 'none') {
      renderFrame(ctx, canvasSize, frameOptions)
    } else {
      effectCleanupRef.current =
        effectHandlers[effect]?.(ctx, canvasSize, frameOptions) ?? null
    }
  }, [contextRef, effect, frameOptions])

  return { applyEffect, effect, frameOptions }
}
