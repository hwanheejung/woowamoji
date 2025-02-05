'use client'

import { blink } from '@/effects'
import createHighDPICanvas from '@/utils/createHighDPICanvas'
import { useEffect, useRef } from 'react'

const CANVAS_SIZE = 50

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // blurry text 방지를 위해 High DPI 캔버스 생성
    const { canvas: highDPICanvas, ratio } = createHighDPICanvas(
      CANVAS_SIZE,
      CANVAS_SIZE,
    )

    // 기존 canvas에 High DPI 캔버스 복사
    canvas.width = highDPICanvas.width
    canvas.height = highDPICanvas.height
    canvas.style.width = `${CANVAS_SIZE}px`
    canvas.style.height = `${CANVAS_SIZE}px`

    if (!contextRef.current) contextRef.current = canvas.getContext('2d')
    const ctx = contextRef.current
    if (!ctx) return

    // High DPI 캔버스에 맞게 스케일 조정
    ctx.scale(ratio, ratio)

    blink(ctx, CANVAS_SIZE)
  }, [])

  return <canvas id="canvas" ref={canvasRef} className="rounded-lg" />
}

export default Canvas
