import { useNavigation } from "@react-navigation/native"
import React from "react"
import { RootStackParamList, RootStackReturnParamList } from "../types"

type StackFlowNavigator<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >
> = {
  navigate: <RouteName extends keyof ParamList>(
    ...args: undefined extends ParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]]
      : [screen: RouteName, params: ParamList[RouteName]]
  ) => Promise<ReturnParamList[RouteName]>
}

type StackItem = {
  inParams: Record<string, object | undefined>
  outParams: Record<string, object | string | number | undefined>
}

type StackFlow = {}

export const useCreateStackFlow = <
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >
>(
  stackFlow: (
    navigation: StackFlowNavigator<ParamList, ReturnParamList>
  ) => Promise<void>
): StackFlow => {
  const stack: StackItem[] = []
}

const context = React.createContext<StackFlow>(undefined!)

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

export const StackFlowProvider: React.FC<
  React.PropsWithChildren<{ flow: StackFlow }>
> = ({ flow, children }) => {
  return <context.Provider value={flow}>{children}</context.Provider>
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
