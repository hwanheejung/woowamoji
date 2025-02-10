import { useFrame } from '@/contexts/FrameContext'
import { useCallback, useMemo, useRef } from 'react'
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
} from '../_textEffects'
import { renderFrame } from '../_utils'

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
  canvasSize: number,
) => {
  const { text, fontFamily, color, effect } = useFrame()
  const effectCleanupRef = useRef<(() => void) | null>(null)

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

  const applyEffect = useCallback(() => {
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
  }, [contextRef, frameOptions, effectHandlers])

  return { applyEffect, frameOptions }
}
