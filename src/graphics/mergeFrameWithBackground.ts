import ensure from '@/utils/ensure'

export const mergeFrameWithBackground = (
  backgroundImage: ImageData,
  frame: ImageData,
): HTMLCanvasElement | null => {
  const frameSize = frame.width

  // 🟢 새로운 캔버스 생성
  const offscreenCanvas = createCanvas(frameSize, frameSize)
  const offscreenCtx = ensure(getCanvasContext(offscreenCanvas))

  // 🟢 배경 이미지 적용
  drawImageDataToCanvas(offscreenCtx, backgroundImage, frameSize)

  // 🟢 프레임 이미지 적용
  drawImageDataToCanvas(offscreenCtx, frame, frameSize)

  return offscreenCanvas
}

// 캔버스 생성 함수
const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

// 캔버스 컨텍스트 가져오기
const getCanvasContext = (
  canvas: HTMLCanvasElement,
): CanvasRenderingContext2D => {
  return ensure(canvas.getContext('2d'))
}

// ImageData를 캔버스에 그리는 함수
const drawImageDataToCanvas = (
  ctx: CanvasRenderingContext2D,
  imageData: ImageData,
  targetSize: number,
) => {
  const tempCanvas = createCanvas(imageData.width, imageData.height)
  const tempCtx = getCanvasContext(tempCanvas)

  tempCtx.putImageData(imageData, 0, 0)

  ctx.drawImage(
    tempCanvas,
    0,
    0,
    imageData.width,
    imageData.height,
    0,
    0,
    targetSize,
    targetSize,
  )
}
