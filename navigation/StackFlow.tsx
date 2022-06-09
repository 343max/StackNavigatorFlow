import {
  NavigationProp,
  ParamListBase,
  RouteProp,
  TypedNavigator,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import React from "react"
import { RootStackParamList, RootStackReturnParamList } from "../types"
import { WalkerError, walkStack } from "./walker"

export type StackItem = {
  screenName: string
  completed: boolean
  inParams?: Record<string, any> | undefined
  outParams?: any
}

type StackFlowNavigation<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >
> = {
  start: <RouteName extends keyof ParamList>(
    screen: RouteName
  ) => ReturnParamList[RouteName]
  navigate: <RouteName extends keyof ParamList>(
    ...args: undefined extends ParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]]
      : [screen: RouteName, params: ParamList[RouteName]]
  ) => ReturnParamList[RouteName]
}

export type StackFlowHandler<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >
> = (navigation: StackFlowNavigation<ParamList, ReturnParamList>) => void

export const useCreateStackFlow = <
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >
>(
  stackFlow: StackFlowHandler<ParamList, ReturnParamList>
): {
  flow: StackFlowHandler<ParamList, ReturnParamList>
  initialRouteName: keyof ParamList
} => {
  const { startScreen } = walkStack(stackFlow, { stack: [] })
  return { flow: stackFlow, initialRouteName: startScreen as string }
}

type UseStackFlow<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >,
  RouteName extends keyof ParamList
> = {
  params: ReturnParamList
  complete: (result: ReturnParamList[RouteName]) => void
}

export type StackFlowInternalState = {
  stack: StackItem[]
}

const context = React.createContext<{
  flow: StackFlowHandler<any, any>
  state: StackFlowInternalState
  setState: (state: StackFlowInternalState) => void
}>(undefined!)

export const StackFlowProvider: React.FC<
  React.PropsWithChildren<{ flow: StackFlowHandler<any, any> }>
> = ({ flow, children }) => {
  const [state, setState] = React.useState<StackFlowInternalState>(() => {
    const { startScreen } = walkStack(flow, { stack: [] })
    return { stack: [{ screenName: startScreen as string, completed: false }] }
  })

  console.log(state.stack)

  return (
    <context.Provider value={{ flow, state, setState }}>
      {children}
    </context.Provider>
  )
}

export const useStackFlow = <
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Readonly<
    Record<keyof ParamList, object | string | number | undefined>
  >,
  RouteName extends keyof ParamList
>(
  screen: RouteName
): UseStackFlow<ParamList, ReturnParamList, RouteName> => {
  const { flow, state, setState } = React.useContext(context)
  const { navigate } = useNavigation<NavigationProp<ParamList>>()
  const { params } = useRoute<RouteProp<ParamList>>()
  return {
    params: (params ?? {}) as ReturnParamList,
    complete: (item: any) => {
      if (state.stack.length === 0)
        throw new WalkerError(
          `tried to complete '${String(screen)}' before starting`
        )

      const [last, ...restReversed] = state.stack.reverse()

      if (last.screenName !== screen)
        throw new WalkerError(
          `expected to complete screen '${last.screenName}', got '${String(
            screen
          )} instead`
        )

      if (last.completed)
        throw new WalkerError(
          `screen '${String(screen)}' called 'complete' multiple times`
        )

      const newStack = [
        ...restReversed.reverse(),
        {
          screenName: last.screenName,
          completed: true,
          inParams: last.inParams,
          outParams: item,
        },
      ]

      const { nextStep } = walkStack(flow, { stack: newStack })

      if (nextStep === null) {
        return
      } else if (nextStep.action === "navigate") {
        setState({
          stack: [
            ...newStack,
            {
              screenName: nextStep.to as string,
              completed: false,
              inParams: nextStep.params,
            },
          ],
        })
        navigate(nextStep.to as any, nextStep.params as any)
      } else {
        throw new WalkerError(`unknown action: ${nextStep.action}`)
      }
    },
  }
}
