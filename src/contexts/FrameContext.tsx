'use client'

import { FontKey } from '@/constants'
import { BackgroundColor, Effect, TextColor } from '@/constants/menu'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

const DEFAULT_OPTIONS: FrameRenderOptions = {
  text: '안녕',
  fontFamily: FontKey.JUA,
  color: TextColor.BLACK,
  backGroundColor: BackgroundColor.LIGHT_GRAY,
  position: { x: 0, y: 0 },
  opacity: 1,
  rotation: 0,
  scale: 1,
}

export interface FrameRenderOptions {
  text?: string
  fontFamily?: FontKey
  color?: `#${string}`
  backGroundColor?: `#${string}`
  position?: { x: number; y: number }
  opacity?: number
  rotation?: number
  scale?: number
}

interface FrameContextValue extends FrameRenderOptions {
  effect: Effect
  setEffect: (effect: Effect) => void
  updateFrame: (options: Partial<FrameRenderOptions>) => void
  resetFrame: () => void
}

const FrameContext = createContext<FrameContextValue | undefined>(undefined)

interface FrameContextProviderProps {
  children: ReactNode
}

export const FrameContextProvider = ({
  children,
}: FrameContextProviderProps) => {
  const [frame, setFrame] = useState<FrameRenderOptions>(DEFAULT_OPTIONS)
  const [effect, setEffect] = useState<Effect>(Effect.NONE)

  // 업데이트 함수 (부분 업데이트 지원)
  const updateFrame = (options: Partial<FrameRenderOptions>) => {
    setFrame((prev) => ({
      ...prev,
      ...options,
    }))
  }

  // 초기화 함수
  const resetFrame = () => {
    setFrame(DEFAULT_OPTIONS)
  }

  const value = useMemo(
    () => ({
      ...frame,
      effect,
      setEffect,
      updateFrame,
      resetFrame,
    }),
    [frame, effect],
  )

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>
}

export const useFrame = () => {
  const context = useContext(FrameContext)
  if (!context) {
    throw new Error('useFrame must be used within a FrameContextProvider')
  }
  return context
}
