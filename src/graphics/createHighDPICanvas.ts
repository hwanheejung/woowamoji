const createHighDPICanvas = (width: number, height: number) => {
  const ratio = window.devicePixelRatio || 1
  const canvas = document.createElement('canvas')

  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`

  return { canvas, ratio }
}

export default createHighDPICanvas
