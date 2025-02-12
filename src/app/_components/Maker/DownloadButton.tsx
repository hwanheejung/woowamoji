'use client'

import { useGif } from '@/contexts/GifContext'

const DownloadButton = () => {
  const { gifBlob } = useGif()

  const downloadGif = () => {
    if (!gifBlob) return
    const url = URL.createObjectURL(gifBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'animation.gif'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <button
      onClick={downloadGif}
      className="text-white w-full rounded-full bg-baeminBlue py-3"
    >
      완료
    </button>
  )
}

export default DownloadButton
