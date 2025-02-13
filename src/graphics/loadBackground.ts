type LoadBackground = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  options: {
    backGroundColor?: string
    backgroundTheme?: string
  },
) => void

const loadBackground: LoadBackground = (context, canvasSize, options) => {
  const { backGroundColor, backgroundTheme } = options
  context.clearRect(0, 0, canvasSize, canvasSize)

  if (backGroundColor) {
    context.fillStyle = backGroundColor
    context.fillRect(0, 0, canvasSize, canvasSize)
  }

  if (backgroundTheme) {
    const img = new Image()
    img.src = `/backgroundThemes/${backgroundTheme}.png`
    img.onload = () => {
      context.drawImage(img, 0, 0, canvasSize, canvasSize)
    }
    img.onerror = () => {
      console.error(`Failed to load background image: ${img.src}`)
    }
  }
}

export default loadBackground
