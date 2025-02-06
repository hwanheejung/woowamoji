import renderFrame from '@/utils/renderFrame'

const DELAY = 500

const blink = (context: CanvasRenderingContext2D, canvasSize: number) => {
  let visible = true

  const animate = () => {
    renderFrame(
      { context, canvasSize },
      {
        text: '안녕',
        opacity: visible ? 1 : 0,
        backGroundColor: '#000',
        color: '#00E431',
        fontFamily: 'kkubulim',
      },
    )
    visible = !visible
    setTimeout(animate, DELAY)
  }

  animate()
}

export default blink
