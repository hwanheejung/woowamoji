'use client'

import { useGif } from '@/contexts/GifContext'
import generateGifFromBuffer from '@/graphics/generateGif'

const DownloadButton = () => {
  const { savedFrames, backgroundImage } = useGif()

  return (
    <button
      onClick={() => generateGifFromBuffer(backgroundImage!, savedFrames)}
      className="text-white w-full rounded-full bg-baeminBlue py-3"
    >
      완료
    </button>
  )
}

export default DownloadButton
