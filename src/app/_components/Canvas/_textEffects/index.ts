import { FrameRenderOptions } from '@/contexts/FrameContext'

export { default as blink } from './blink'
export { default as pulse } from './pulse'
export { default as spin } from './spin'
export { default as wobble } from './wobble'
export { default as float } from './float'
export { default as shake } from './shake'
export { default as bounce } from './bounce'
export { default as oneByOne } from './oneByOne'
export { default as slideX } from './slideX'

export type EffectArgs = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
) => (() => void) | void
