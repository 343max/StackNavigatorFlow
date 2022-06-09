import React from "react"
import { walkStack } from "./walker"

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
  const { startScreen } = walkStack(stackFlow, [])
  return { flow: stackFlow, initialRouteName: startScreen as string }
}

export type StackFlowInternalStack = StackItem[]

export const stackFlowContext = React.createContext<{
  flow: StackFlowHandler<any, any>
  stack: StackFlowInternalStack
  setStack: (state: StackFlowInternalStack) => void
}>(undefined!)

export const StackFlowProvider: React.FC<
  React.PropsWithChildren<{ flow: StackFlowHandler<any, any> }>
> = ({ flow, children }) => {
  const [stack, setStack] = React.useState<StackFlowInternalStack>(() => {
    const { startScreen } = walkStack(flow, [])
    return [{ screenName: startScreen as string, completed: false }]
  })

  return (
    <stackFlowContext.Provider value={{ flow, stack, setStack }}>
      {children}
    </stackFlowContext.Provider>
  )
}
