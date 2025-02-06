'use client'

import { useFrame } from '@/contexts/FrameContext'
import { blink } from '@/effects'
import createHighDPICanvas from '@/utils/createHighDPICanvas'
import { useEffect, useRef, useCallback, useMemo } from 'react'
import debounce from '@/utils/debounce'

const CANVAS_SIZE = 50
const DEBOUNCE_DELAY = 500

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const { text, fontFamily } = useFrame()

  const frameOptions = useMemo(() => ({ text, fontFamily }), [text, fontFamily])

  // 캔버스 초기화 (High DPI 적용)
  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || contextRef.current) return

    const { canvas: highDPICanvas, ratio } = createHighDPICanvas(
      CANVAS_SIZE,
      CANVAS_SIZE,
    )
    canvas.width = highDPICanvas.width
    canvas.height = highDPICanvas.height
    canvas.style.width = `${CANVAS_SIZE}px`
    canvas.style.height = `${CANVAS_SIZE}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.scale(ratio, ratio)
    contextRef.current = ctx
  }, [])

  // 캔버스에 프레임 렌더링하는 함수 (debounce 적용)
  const debouncedRender = useMemo(
    () =>
      debounce((frameOptions) => {
        const ctx = contextRef.current
        if (!ctx) return
        blink(ctx, CANVAS_SIZE, frameOptions)
      }, DEBOUNCE_DELAY),
    [],
  )

  useEffect(() => {
    initializeCanvas()
    debouncedRender(frameOptions)
  }, [frameOptions, initializeCanvas, debouncedRender])

  return <canvas id="canvas" ref={canvasRef} className="rounded-lg" />
}

export default Canvas
