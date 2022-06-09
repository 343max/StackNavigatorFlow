import { TypedNavigator, useNavigation } from "@react-navigation/native"
import React from "react"
import { RootStackParamList, RootStackReturnParamList } from "../types"
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
  const [state, setState] = React.useState<StackFlowInternalState>({
    stack: [],
  })
  return (
    <context.Provider value={{ flow, state, setState }}>
      {children}
    </context.Provider>
  )
}

export const useStackFlow = <
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >,
  RouteName extends keyof ParamList
>(
  screen: RouteName
): UseStackFlow<ParamList, ReturnParamList, RouteName> => {
  return { complete: (item: any) => alert(item) }
}
