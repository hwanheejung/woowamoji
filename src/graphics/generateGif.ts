import { mergeFrameWithBackground } from './mergeFrameWithBackground'

const generateGifFromBuffer = async (
  backgroundImage: ImageData,
  frames: ImageData[],
) => {
  if (typeof window === 'undefined') return

  const { default: GIF } = await import('public/gif.js')
  const gif = new GIF({
    workers: 2,
    quality: 10,
  })

  frames.forEach((frame) => {
    const combinedCanvas = mergeFrameWithBackground(backgroundImage, frame)
    if (!combinedCanvas) {
      console.error('❌ Error: Failed to merge frame with background')
      return
    }
    const combinedCtx = combinedCanvas.getContext('2d')
    if (!combinedCtx) {
      console.error('❌ Error: Failed to get 2D context from merged canvas')
      return
    }

    const width = Math.round(combinedCanvas.width)
    const height = Math.round(combinedCanvas.height)

    const imageData = combinedCtx.getImageData(0, 0, width, height)

    gif.addFrame(imageData, {
      copy: true,
      delay: 300,
    })
  })

  gif.on('finished', (blob: Blob) => {
    const gifUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = gifUrl
    a.download = 'animation.gif'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  })

  gif.render()
}

export default generateGifFromBuffer
