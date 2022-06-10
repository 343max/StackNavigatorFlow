import { walkStack } from "./walker"
describe("StackFlowWalker", () => {
  it("starts", () => {
    const res = walkStack(({ start }) => {
      start("hello")
    }, [])
    expect(res.startScreen).toBe("hello")
    expect(res.nextStep).toBeNull()
  })

  it("start should return the recorded result", () => {
    walkStack(
      ({ start }) => {
        const res = start("hello")
        expect(res).toEqual({ prop: "good" })
      },
      [
        {
          screenName: "hello",
          completed: true,
          outParams: { prop: "good" },
        },
      ]
    )
  })

  it("throws when start doesn't match", () => {
    expect(() =>
      walkStack(
        (x) => x.start("unexpected"),
        [
          {
            screenName: "expected",
            completed: false,
          },
        ]
      )
    ).toThrow("inconsistent start expected 'expected', got: 'unexpected'")
  })

  it("throws when start is called twice", () => {
    expect(() =>
      walkStack(
        ({ start }) => {
          start("hello")
          start("hello2")
        },
        [
          {
            screenName: "hello",
            completed: false,
          },
        ]
      )
    ).toThrow("'start' must only be called once and first")
  })

  it("walks to the next step", () => {
    const res = walkStack(
      ({ start, navigate }) => {
        start("start")
        navigate("next")
      },
      [
        {
          screenName: "start",
          completed: true,
        },
      ]
    )
    expect(res.nextStep).toEqual({ action: "navigate", to: "next" })
  })

  it("breaks when names don't match", () => {
    expect(() =>
      walkStack(
        ({ start, navigate }) => {
          start("start")
          navigate("next")
        },
        [
          {
            screenName: "start",
            completed: true,
          },
          {
            screenName: "something different",
            completed: false,
          },
        ]
      )
    ).toThrow(
      "inconsistent navigation expected: 'something different' got: 'next'"
    )
  })

  it("breaks when params don't match", () => {
    expect(() =>
      walkStack(
        ({ start, navigate }) => {
          start("start")
          navigate("next", { a: 42 })
        },
        [
          {
            screenName: "start",
            completed: true,
          },
          {
            screenName: "next",
            completed: true,
            inParams: { a: 23 },
          },
        ]
      )
    ).toThrow("inconsistent params for screen 'next'")
  })

  it("doesn't skip step if it isn't completed", () => {
    const res = walkStack(
      ({ start, navigate }) => {
        start("start")
        navigate("next")
        navigate("not there yet")
      },
      [
        {
          screenName: "start",
          completed: true,
        },
        {
          screenName: "next",
          completed: false,
        },
      ]
    )
    expect(res.nextStep).toEqual({ action: "navigate", to: "next" })
  })

  it("skips next step when already completed", () => {
    const res = walkStack(
      ({ start, navigate }) => {
        start("start")
        navigate("already done")
        navigate("next")
      },
      [
        {
          screenName: "start",
          completed: true,
        },
        {
          screenName: "already done",
          completed: true,
        },
      ]
    )
    expect(res.nextStep).toEqual({ action: "navigate", to: "next" })
  })

  it("starts over when start over is called", () => {
    const res = walkStack(
      ({ start, startOver }) => {
        start("start")
        startOver()
      },
      [
        {
          screenName: "start",
          completed: true,
        },
      ]
    )
    expect(res.nextStep).toEqual({ action: "startOver", to: "start" })
  })

  it("starts over to other screen", () => {
    const res = walkStack(
      ({ start, startOver }) => {
        start("start")
        startOver("notStart")
      },
      [
        {
          screenName: "start",
          completed: true,
        },
      ]
    )
    expect(res.nextStep).toEqual({ action: "startOver", to: "notStart" })
  })
})
