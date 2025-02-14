import ensure from '@/utils/ensure'
import { mergeFrameWithBackground } from './mergeFrameWithBackground'

/**
 * GIF를 생성하는 함수
 * - `backgroundImage`와 `frames`를 합성하여 GIF를 생성하고 다운로드
 */
const generateGifFromBuffer = async (
  backgroundImage: ImageData,
  frames: ImageData[],
  interval: number,
) => {
  if (typeof window === 'undefined') return

  const { default: GIF } = await import('public/gif.js')
  const gif = new GIF({ workers: 2, quality: 10 })

  // 🟢 GIF 프레임 생성
  const gifFrames = frames
    .map((frame) => mergeFrameWithBackground(backgroundImage, frame))
    .filter(Boolean)
    .map(ensure)
    .map(extractFrameData)

  // 🟢 GIF 프레임 추가
  gifFrames.forEach(({ imageData, width, height }) => {
    gif.addFrame(imageData, { copy: true, delay: interval, width, height })
  })

  // 🟢 GIF 생성 완료 후 다운로드
  gif.on('finished', downloadGif)
  gif.render()
}

/**
 * 캔버스에서 프레임 데이터 추출
 */
const extractFrameData = (canvas: HTMLCanvasElement) => {
  const ctx = ensure(canvas.getContext('2d'))
  const width = Math.round(canvas.width)
  const height = Math.round(canvas.height)
  const imageData = ctx.getImageData(0, 0, width, height)
  return { imageData, width, height }
}

/**
 * GIF를 다운로드하는 함수
 */
const downloadGif = (blob: Blob) => {
  const gifUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = gifUrl
  a.download = 'animation.gif'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default generateGifFromBuffer
