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

const loadBackground: LoadBackground = (
  context,
  canvasSize,
  setBackgroundImage,
  options,
) => {
  const { backGroundColor, backgroundTheme } = options
  context.clearRect(0, 0, canvasSize, canvasSize)

  const actualCanvasSize = context.canvas.width

  if (backGroundColor) {
    context.fillStyle = backGroundColor
    context.fillRect(0, 0, canvasSize, canvasSize)
    const capturedImage = context.getImageData(
      0,
      0,
      actualCanvasSize,
      actualCanvasSize,
    )
    setBackgroundImage(capturedImage)
  }

  if (backgroundTheme) {
    const img = new Image()
    img.src = `/backgroundThemes/${backgroundTheme}.png`
    img.onload = () => {
      context.drawImage(img, 0, 0, canvasSize, canvasSize)
      const capturedImage = context.getImageData(
        0,
        0,
        actualCanvasSize,
        actualCanvasSize,
      )
      setBackgroundImage(capturedImage)
    }
    img.onerror = () => {
      console.error(`Failed to load background image: ${img.src}`)
    }
  }
}

export default loadBackground
