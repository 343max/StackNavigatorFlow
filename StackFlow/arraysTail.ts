export const arraysTail = <T>(array: T[]): [T | undefined, T[]] => {
  const t = [...array]
  const tail = t.pop()
  return [tail, t]
}
