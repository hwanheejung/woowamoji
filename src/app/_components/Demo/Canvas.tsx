'use client'

import renderFrame from '@/utils/renderFrame'
import { useEffect, useRef } from 'react'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      renderFrame({
        canvas,
        text: '안녕하세요',
        fontFamily: '50px kkubulim',
        color: '#FF5733',
        backGroundColor: '#F0F0F0',
        position: { x: 0, y: 50 },
        opacity: 1,
        rotation: 0,
        scale: 1,
      })
    }
  }, [])

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="h-[50px] w-[50px] rounded-lg"
    />
  )
}

export default Canvas
