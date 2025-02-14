'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useRef,
  RefObject,
} from 'react'

interface GifContextType {
  gifBlob: Blob | null
  setGifBlob: (gif: Blob | null) => void
  savedFramesRef: RefObject<ImageData[]>
  savedFrames: ImageData[]
  addFrameToBuffer: (ctx: CanvasRenderingContext2D, canvasSize: number) => void
  clearFrameBuffer: () => void
}

const GifContext = createContext<GifContextType | undefined>(undefined)

export const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifBlob, setGifBlob] = useState<Blob | null>(null)
  const [savedFrames, setSavedFrames] = useState<ImageData[]>([])
  const savedFramesRef = useRef<ImageData[]>([]) // ✅ 프레임 리스트 최신 상태 유지

  const addFrameToBuffer = useCallback(
    (ctx: CanvasRenderingContext2D, canvasSize: number) => {
      const frame = ctx.getImageData(0, 0, canvasSize, canvasSize)

      savedFramesRef.current = [...savedFramesRef.current, frame] // 최신 상태 유지
      setSavedFrames(savedFramesRef.current) // useState 업데이트
    },
    [],
  )

  const clearFrameBuffer = useCallback(() => {
    savedFramesRef.current = [] // ✅ Ref도 초기화
    setSavedFrames([])
  }, [])

  const value = useMemo(
    () => ({
      gifBlob,
      setGifBlob,
      savedFramesRef,
      savedFrames,
      addFrameToBuffer,
      clearFrameBuffer,
    }),
    [gifBlob, savedFrames, addFrameToBuffer, clearFrameBuffer],
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
