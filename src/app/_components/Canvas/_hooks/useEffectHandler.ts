import { useFrame } from '@/contexts/FrameContext'
import { blink } from '@/effects'
import renderFrame from '@/utils/renderFrame'
import { useCallback, useMemo, useRef } from 'react'

const CANVAS_SIZE = 50

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
) => {
  const { text, fontFamily, effect } = useFrame()
  const effectCleanupRef = useRef<(() => void) | null>(null)

  const frameOptions = useMemo(() => ({ text, fontFamily }), [text, fontFamily])

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
      default:
        renderFrame(ctx, CANVAS_SIZE, frameOptions)
        break
    }
  }, [frameOptions, effect, contextRef])

  return { applyEffect, effect, frameOptions }
}
