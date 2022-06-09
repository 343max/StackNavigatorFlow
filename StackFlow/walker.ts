import { StackFlowInternalState, StackFlowHandler } from "./StackFlow"
import { StackFlowError } from "./StackFlowError"

type RouteName = string | symbol | number

type NextStep = {
  action: "navigate"
  to: RouteName
  params: Record<string, any>
}

class ReachedEndError extends Error {
  nextStep: NextStep | null

  constructor(nextStep: NextStep | null) {
    super()
    this.nextStep = nextStep
  }
}

type WalkerResult = { startScreen: RouteName; nextStep: NextStep | null }

export const walkStack = (
  flow: StackFlowHandler<any, any>,
  { stack }: StackFlowInternalState
): WalkerResult => {
  const state: {
    startScreen: RouteName | undefined
    cursor: number
    nextStep: NextStep | null
  } = {
    startScreen: undefined,
    cursor: 0,
    nextStep: null,
  }
  try {
    flow({
      start: (startScreen) => {
        if (state.cursor !== 0)
          throw new StackFlowError("'start' must only be called once and first")
        if (stack.length > 0 && stack[0].screenName !== startScreen)
          throw new StackFlowError(
            `inconsistent start expected '${
              stack[0].screenName
            }', got: '${String(startScreen)}'`
          )
        state.startScreen = startScreen
        if (stack.length === 0) throw new ReachedEndError(null)

        const ret = stack[state.cursor].outParams
        state.cursor += 1
        return ret
      },
      navigate: (...args) => {
        const [screenName, params] = args
        const stackItem = stack[state.cursor]
        if (stackItem === undefined)
          throw new ReachedEndError({
            action: "navigate",
            to: screenName,
            params,
          })

        if (stackItem.screenName !== screenName)
          throw new StackFlowError(
            `inconsistent navigation expected: '${
              stackItem.screenName
            }' got: '${String(screenName)}'`
          )

        if (JSON.stringify(stackItem.inParams) !== JSON.stringify(params))
          throw new StackFlowError(
            `inconsistent params for screen '${String(screenName)}'`
          )

        if (!stackItem.completed)
          throw new ReachedEndError({
            action: "navigate",
            to: screenName,
            params,
          })

        state.cursor += 1
        return stackItem.outParams
      },
    })
  } catch (error) {
    if (error instanceof ReachedEndError) {
      state.nextStep = error.nextStep
    } else {
      throw error
    }
  }
  if (state.startScreen === undefined)
    throw new StackFlowError("'start' must be called exactly once")

  return { startScreen: state.startScreen, nextStep: state.nextStep }
}
