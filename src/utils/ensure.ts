const ensure = <T>(value: T): NonNullable<T> => {
  if (!value) {
    throw new Error(`${value} is not defined`)
  }
  return value
}

export default ensure
