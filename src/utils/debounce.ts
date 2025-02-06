import { AnyFunc, Timer } from './types'

type Debounce = <T extends AnyFunc>(
  fn: T,
  delay: number,
) => (...args: Parameters<T>) => void

const debounce: Debounce = (fn, delay) => {
  let timer: Timer = null

  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default debounce
