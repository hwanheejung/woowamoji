import { Dispatch, SetStateAction } from 'react'

type LoadBackground = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  setBackgroundImage: Dispatch<SetStateAction<ImageData | null>>,
  options: {
    backGroundColor?: string
    backgroundTheme?: string
  },
) => void

/**
 * 1. 배경 렌더링 / 2. 배경 이미지 캡쳐
 */
const loadBackground: LoadBackground = (
  context,
  canvasSize,
  setBackgroundImage,
  options,
) => {
  const { backGroundColor, backgroundTheme } = options
  context.clearRect(0, 0, canvasSize, canvasSize)

  if (backGroundColor) {
    applyBackgroundColor(
      context,
      canvasSize,
      backGroundColor,
      setBackgroundImage,
    )
  }

  if (backgroundTheme) {
    applyBackgroundImage(
      context,
      canvasSize,
      backgroundTheme,
      setBackgroundImage,
    )
  }
}

const applyBackgroundColor = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  color: string,
  setBackgroundImage: Dispatch<SetStateAction<ImageData | null>>,
) => {
  context.fillStyle = color
  context.fillRect(0, 0, canvasSize, canvasSize)
  captureBackgroundImage(context, setBackgroundImage)
}

const applyBackgroundImage = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  theme: string,
  setBackgroundImage: Dispatch<SetStateAction<ImageData | null>>,
) => {
  const img = new Image()
  img.src = `/backgroundThemes/${theme}.png`
  img.onload = () => {
    context.drawImage(img, 0, 0, canvasSize, canvasSize)
    captureBackgroundImage(context, setBackgroundImage)
  }
  img.onerror = () =>
    console.error(`Failed to load background image: ${img.src}`)
}

/**
 * 캡쳐를 위한 배경을 ImageData로 저장
 */
const captureBackgroundImage = (
  context: CanvasRenderingContext2D,
  setBackgroundImage: Dispatch<SetStateAction<ImageData | null>>,
) => {
  const canvasSize = context.canvas.width
  setBackgroundImage(context.getImageData(0, 0, canvasSize, canvasSize))
}

export default loadBackground
