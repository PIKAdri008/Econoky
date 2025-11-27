export function clampNumber(value: string | number, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const numeric = typeof value === 'number' ? value : Number(value)
  if (isNaN(numeric)) {
    return min
  }
  return Math.min(Math.max(numeric, min), max)
}

export function roundToTwo(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100
}


