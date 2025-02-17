'use client'

import { EFFECT_SETTINGS } from '@/constants'
import { useFrame } from '@/contexts/FrameContext'
import { useGif } from '@/contexts/GifContext'
import generateGifFromBuffer from '@/graphics/generateGif'

const DownloadButton = () => {
  const { savedFrames, backgroundImage } = useGif()
  const { text, effect } = useFrame()
  const interval = EFFECT_SETTINGS[effect].FRAME_INTERVAL

  return (
    <button
      onClick={() =>
        generateGifFromBuffer(backgroundImage!, savedFrames, interval)
      }
      className={`text-white w-full rounded-full bg-baeminBlue py-3 ${!text && 'cursor-not-allowed opacity-50'}`}
      disabled={!text}
    >
      다운로드
    </button>
  )
}

export default DownloadButton
