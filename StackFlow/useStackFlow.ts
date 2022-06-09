import { stackFlowContext } from "./StackFlow"
import React from "react"
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { StackFlowError, walkStack } from "./walker"

type UseStackFlow<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >,
  RouteName extends keyof ParamList
> = {
  params: Readonly<ParamList[RouteName]>
  complete: (result: ReturnParamList[RouteName]) => void
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
  const { flow, state, setState } = React.useContext(stackFlowContext)
  const { navigate } = useNavigation<NavigationProp<ParamList>>()
  const { params } = useRoute<RouteProp<ParamList, RouteName>>()

  return {
    params: params as NonNullable<typeof params>,
    complete: (item: any) => {
      if (state.stack.length === 0)
        throw new StackFlowError(
          `tried to complete '${String(screen)}' before starting`
        )

      const [last, ...restReversed] = state.stack.reverse()

      if (last.screenName !== screen)
        throw new StackFlowError(
          `expected to complete screen '${last.screenName}', got '${String(
            screen
          )} instead`
        )

      if (last.completed)
        throw new StackFlowError(
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
        throw new StackFlowError(`unknown action: ${nextStep.action}`)
      }
    },
  }
}
