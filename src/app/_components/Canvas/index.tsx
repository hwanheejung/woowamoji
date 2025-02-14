'use client'

import { useCanvasRefs } from '@/contexts/CanvasContext'
import { useFrame } from '@/contexts/FrameContext'
import { useGif } from '@/contexts/GifContext'
import loadBackground from '@/graphics/loadBackground'
import { HTMLAttributes, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCanvas } from './_hooks/useCanvas'
import { useEffectHandler } from './_hooks/useEffectHandler'
import ensure from '@/utils/ensure'

const CANVAS_SIZE = 50

interface CanvasProps {
  className?: HTMLAttributes<HTMLDivElement>['className']
}

const Canvas = ({ className }: CanvasProps) => {
  const { backgroundCanvasRef, mainCanvasRef } = useCanvasRefs()
  const { backGroundColor, backgroundTheme } = useFrame()
  const { setBackgroundImage } = useGif()

  const { contextRef: bgContextRef, initializeCanvas: initBgCanvas } =
    useCanvas(backgroundCanvasRef)
  const { contextRef: mainContextRef, initializeCanvas: initMainCanvas } =
    useCanvas(mainCanvasRef)

  const { frameOptions, applyEffect } = useEffectHandler(
    mainContextRef,
    CANVAS_SIZE,
  )

  // 🟢 캔버스 초기화
  useEffect(() => {
    initBgCanvas()
    initMainCanvas()
  }, [initBgCanvas, initMainCanvas])

  // 🟢 배경 캔버스 업데이트
  useEffect(() => {
    const bgCtx = ensure(bgContextRef.current)

    loadBackground(bgCtx, CANVAS_SIZE, setBackgroundImage, {
      backGroundColor,
      backgroundTheme,
    })
  }, [backGroundColor, backgroundTheme, bgContextRef])

  // 🟢 텍스트 효과 적용
  useEffect(() => {
    applyEffect()
  }, [applyEffect, frameOptions])

  return (
    <div className={twMerge('z-10 h-full w-full overflow-hidden', className)}>
      <canvas
        id="backgroundCanvas"
        ref={backgroundCanvasRef}
        className="absolute left-0 top-0 -z-10"
      />
      <canvas
        id="mainCanvas"
        ref={mainCanvasRef}
        className="absolute left-0 top-0"
      />
    </div>
  )
}

export default Canvas
