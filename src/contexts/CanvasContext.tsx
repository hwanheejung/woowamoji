'use client'

import { createContext, useContext, useRef, RefObject } from 'react'

interface CanvasContextType {
  backgroundCanvasRef: RefObject<HTMLCanvasElement>
  mainCanvasRef: RefObject<HTMLCanvasElement>
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null!)
  const mainCanvasRef = useRef<HTMLCanvasElement>(null!)

  return (
    <CanvasContext.Provider value={{ backgroundCanvasRef, mainCanvasRef }}>
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvasRefs = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvasRefs must be used within a CanvasProvider')
  }
  return context
}
