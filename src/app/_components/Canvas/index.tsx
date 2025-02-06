'use client'

import { useEffect, useRef } from 'react'
import { useCanvas } from './_hooks/useCanvas'
import { useEffectHandler } from './_hooks/useEffectHandler'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { contextRef, initializeCanvas } = useCanvas(canvasRef)
  const { applyEffect, effect, frameOptions } = useEffectHandler(contextRef)

  useEffect(() => {
    initializeCanvas()
  }, [initializeCanvas])

  useEffect(() => {
    applyEffect()
  }, [effect, frameOptions])

  return <canvas id="canvas" ref={canvasRef} className="rounded-lg" />
}

export default Canvas
