'use client'

import renderFrame from '@/utils/renderFrame'
import { useEffect, useRef } from 'react'

const CANVAS_SIZE = 50

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = CANVAS_SIZE
      canvas.height = CANVAS_SIZE
      renderFrame({
        canvas,
        text: '안녕하',
        fontFamily: 'kkubulim',
        color: '#000',
        backGroundColor: '#F0F0F0',
        position: { x: 0, y: 0 },
        opacity: 1,
        rotation: 0,
        scale: 1,
      })
    }
  }, [])

  return <canvas id="canvas" ref={canvasRef} className="rounded-lg" />
}

export default Canvas
