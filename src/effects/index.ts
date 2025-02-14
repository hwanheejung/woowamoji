import { FrameRenderOptions } from '@/contexts/FrameContext'
import { RefObject } from 'react'

export { default as blink } from './blink'
export { default as bounce } from './bounce'
export { default as float } from './float'
export { default as oneByOne } from './oneByOne'
export { default as pulse } from './pulse'
export { default as shake } from './shake'
export { default as slideX } from './slideX'
export { default as spin } from './spin'
export { default as wobble } from './wobble'

export type EffectArgs = (
  context: CanvasRenderingContext2D,
  canvasSize: number,
  frameOptions: FrameRenderOptions,
  savedFramesRef: RefObject<ImageData[]>,
  addFrameToBuffer: (ctx: CanvasRenderingContext2D, canvasSize: number) => void,
) => (() => void) | void
