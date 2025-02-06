'use client'

import debounce from '@/utils/debounce'
import { useEffect, useMemo, useRef } from 'react'
import { useCanvas } from './_hooks/useCanvas'
import { useEffectHandler } from './_hooks/useEffectHandler'

const DEBOUNCE_DELAY = 500

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { contextRef, initializeCanvas } = useCanvas(canvasRef)
  const { applyEffect, effect, frameOptions } = useEffectHandler(contextRef)

  const debouncedRender = useMemo(
    () =>
      debounce(() => {
        applyEffect()
      }, DEBOUNCE_DELAY),
    [],
  )

  useEffect(() => {
    initializeCanvas()
  }, [initializeCanvas])

  // 🟢 effect 변경 시 바로 적용
  useEffect(() => {
    applyEffect()
  }, [effect])

  // 🟢 frameOptions 변경 시 debounce 적용
  useEffect(() => {
    debouncedRender()
  }, [frameOptions, debouncedRender])

  return <canvas id="canvas" ref={canvasRef} className="rounded-lg" />
}

export default Canvas
