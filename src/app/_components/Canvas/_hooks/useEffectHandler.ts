import { useFrame } from '@/contexts/FrameContext'
import { blink, float, pulse, spin, wobble } from '@/effects'
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

  const applyEffect = useCallback(() => {
    // 이전 timer clear
    if (effectCleanupRef.current) {
      effectCleanupRef.current()
      effectCleanupRef.current = null
    }

    const ctx = contextRef.current
    if (!ctx) return

    // 🟢
    switch (effect) {
      case 'none':
        renderFrame(ctx, CANVAS_SIZE, frameOptions)
        break
      case 'blink':
        effectCleanupRef.current = blink(ctx, CANVAS_SIZE, frameOptions)
        break
      case 'pulse':
        effectCleanupRef.current = pulse(ctx, CANVAS_SIZE, frameOptions)
        break
      case 'wobble':
        effectCleanupRef.current = wobble(ctx, CANVAS_SIZE, frameOptions)
        break
      case 'spin':
        effectCleanupRef.current = spin(ctx, CANVAS_SIZE, frameOptions)
        break
      case 'float':
        effectCleanupRef.current = float(ctx, CANVAS_SIZE, frameOptions)
        break
      default:
        renderFrame(ctx, CANVAS_SIZE, frameOptions)
        break
    }
  }, [contextRef, effect, frameOptions])

  return { applyEffect, effect, frameOptions }
}
