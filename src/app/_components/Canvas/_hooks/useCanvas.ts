import { useCallback, useRef } from 'react'
import createHighDPICanvas from '@/graphics/createHighDPICanvas'

const CANVAS_SIZE = 50

export const useCanvas = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) => {
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

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
  }, [canvasRef])

  return { contextRef, initializeCanvas }
}
