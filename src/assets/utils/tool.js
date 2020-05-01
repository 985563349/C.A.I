export const deepClone = data => {
  if (typeof data !== 'object' || data === null) {
    return data
  }

  const res = Array.isArray(data) ? [] : {}

  Object.keys(data).forEach(key => {
    res[key] = deepClone(data[key])
  })

  return res
}
