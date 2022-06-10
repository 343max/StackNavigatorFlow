import { arraysTail } from "./arraysTail"
describe("arraysTails", () => {
  it("returns nothing on empty array", () => {
    const [tail, rest] = arraysTail([])
    expect(tail).toBeUndefined()
    expect(rest).toEqual([])
  })

  it("returns the tail on a long array", () => {
    const [tail, rest] = arraysTail([1, 2, 3, 4, 42])
    expect(tail).toBe(42)
    expect(rest).toEqual([1, 2, 3, 4])
  })

  it("returns an empty array on a single element", () => {
    const [tail, rest] = arraysTail(["foo"])
    expect(tail).toBe("foo")
    expect(rest).toEqual([])
  })

  it("leave the original array alone", () => {
    const original = [1, 2, 3, 4, 42]
    const [tail, rest] = arraysTail([1, 2, 3, 4, 42])
    expect(original).toEqual([1, 2, 3, 4, 42])
  })
})
