'use client'

import {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'

interface GifContextType {
  backgroundImage: ImageData | null
  setBackgroundImage: Dispatch<SetStateAction<ImageData | null>>
  savedFramesRef: RefObject<ImageData[]>
  savedFrames: ImageData[]
  addFrameToBuffer: (ctx: CanvasRenderingContext2D) => void
  clearFrameBuffer: () => void
}

const GifContext = createContext<GifContextType | undefined>(undefined)

export const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [backgroundImage, setBackgroundImage] = useState<ImageData | null>(null)
  const [savedFrames, setSavedFrames] = useState<ImageData[]>([])
  const savedFramesRef = useRef<ImageData[]>([])

  const addFrameToBuffer = useCallback((ctx: CanvasRenderingContext2D) => {
    const frame = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)

    savedFramesRef.current = [...savedFramesRef.current, frame]
    setSavedFrames(savedFramesRef.current)
  }, [])

  const clearFrameBuffer = useCallback(() => {
    savedFramesRef.current = []
    setSavedFrames([])
  }, [])

  const value = useMemo(
    () => ({
      backgroundImage,
      setBackgroundImage,
      savedFramesRef,
      savedFrames,
      addFrameToBuffer,
      clearFrameBuffer,
    }),
    [
      backgroundImage,
      setBackgroundImage,
      savedFrames,
      addFrameToBuffer,
      clearFrameBuffer,
    ],
  )

  return <GifContext.Provider value={value}>{children}</GifContext.Provider>
}

export const useGif = () => {
  const context = useContext(GifContext)
  if (!context) {
    throw new Error('useGif must be used within a GifProvider')
  }
  return context
}
