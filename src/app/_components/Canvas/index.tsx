'use client'

import { useFrame } from '@/contexts/FrameContext'
import { HTMLAttributes, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCanvas } from './_hooks/useCanvas'
import { useEffectHandler } from './_hooks/useEffectHandler'
import { loadBackground } from './_utils'

const CANVAS_SIZE = 50

interface CanvasProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
}

const Canvas = (props: CanvasProps) => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null)
  const { contextRef: bgContextRef, initializeCanvas: initializeBgCanvas } =
    useCanvas(backgroundCanvasRef)
  const { backGroundColor, backgroundTheme } = useFrame()

  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const { contextRef: mainContextRef, initializeCanvas: initializeMainCanvas } =
    useCanvas(mainCanvasRef)
  const { applyEffect, frameOptions } = useEffectHandler(
    mainContextRef,
    CANVAS_SIZE,
  )

  useEffect(() => {
    initializeBgCanvas()
    initializeMainCanvas()
  }, [initializeMainCanvas, initializeBgCanvas])

  useEffect(() => {
    const bgCtx = bgContextRef.current
    if (!bgCtx) return

    loadBackground(bgCtx, CANVAS_SIZE, {
      backGroundColor,
      backgroundTheme,
    })
  }, [backGroundColor, backgroundTheme])

  useEffect(() => {
    applyEffect()
  }, [frameOptions])

  return (
    <div
      className={twMerge(
        'z-10 h-full w-full overflow-hidden border-[1px]',
        props.className,
      )}
    >
      <canvas
        id="backgroundCanvas"
        ref={backgroundCanvasRef}
        className="absolute left-0 top-0 -z-10"
      />
      <canvas
        id="canvas"
        ref={mainCanvasRef}
        className="absolute left-0 top-0"
      />
    </div>
  )
}

export default Canvas
