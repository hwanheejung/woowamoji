'use client'

import { createContext, useContext, useMemo, useState } from 'react'

interface GifContextType {
  gifBlob: Blob | null
  setGifBlob: (gif: Blob | null) => void
}

const GifContext = createContext<GifContextType | undefined>(undefined)

export const GifProvider = ({ children }: { children: React.ReactNode }) => {
  const [gifBlob, setGifBlob] = useState<Blob | null>(null)

  const value = useMemo(() => ({ gifBlob, setGifBlob }), [gifBlob, setGifBlob])

  return <GifContext.Provider value={value}>{children}</GifContext.Provider>
}

export const useGif = () => {
  const context = useContext(GifContext)
  if (!context) {
    throw new Error('useGif must be used within a GifProvider')
  }
  return context
}
