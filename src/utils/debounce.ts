type AnyFunc = (...args: any[]) => any
type Timeout = ReturnType<typeof setTimeout> | null

type Debounce = <T extends AnyFunc>(
  fn: T,
  delay: number,
) => (...args: Parameters<T>) => void

const debounce: Debounce = (fn, delay) => {
  let timeout: Timeout = null

  return (...args) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default debounce
