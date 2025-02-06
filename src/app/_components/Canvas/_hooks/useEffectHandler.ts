import { useFrame } from '@/contexts/FrameContext'
import { blink } from '@/effects'
import renderFrame from '@/utils/renderFrame'
import { useCallback, useEffect, useRef } from 'react'

const CANVAS_SIZE = 50

export const useEffectHandler = (
  contextRef: React.RefObject<CanvasRenderingContext2D | null>,
) => {
  const { text, fontFamily, effect } = useFrame()
  const effectCleanupRef = useRef<(() => void) | null>(null)
  const frameOptionsRef = useRef({ text, fontFamily })

  useEffect(() => {
    frameOptionsRef.current = { text, fontFamily }
  }, [text, fontFamily])

  const applyEffect = useCallback(() => {
    // 이전 timer clear
    if (effectCleanupRef.current) {
      effectCleanupRef.current()
      effectCleanupRef.current = null
    }

    const ctx = contextRef.current
    if (!ctx) return

    const frameOptions = frameOptionsRef.current

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
  }, [effect, contextRef])

  return { applyEffect, effect, frameOptions: frameOptionsRef.current }
}
