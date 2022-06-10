import { arraysTail } from "./arraysTail"
import { stackFlowContext } from "./StackFlow"
import React from "react"
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native"
import { walkStack } from "./walker"
import { StackFlowError } from "./StackFlowError"

type UseStackFlow<
  ParamList extends { [X in string]: object | undefined },
  ReturnParamList extends Record<
    keyof ParamList,
    object | string | number | undefined
  >,
  RouteName extends keyof ParamList
> = {
  params: Readonly<ParamList[RouteName]>
  complete: undefined extends ReturnParamList[RouteName]
    ? (result?: undefined) => void
    : (result: ReturnParamList[RouteName]) => void
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
  const { flow, stack, setStack } = React.useContext(stackFlowContext)
  const { navigate, addListener } = useNavigation<NavigationProp<ParamList>>()
  const { params } = useRoute<RouteProp<ParamList, RouteName>>()

  React.useEffect(() => {
    const unsubscribe = addListener("beforeRemove", () => {
      const [current, rest] = arraysTail(stack)
      console.log(current)
      if (current === undefined)
        throw new StackFlowError(
          `tried to remove screen '${String(
            screen
          )}' but the stack is already empty`
        )

      if (current.screenName !== screen)
        throw new StackFlowError(
          `tried to remove screen '${String(
            screen
          )}' but top of the stack is '${current.screenName}'`
        )

      const [before, smallerRest] = arraysTail(rest)

      if (before === undefined) {
        setStack(smallerRest)
      } else {
        before.outParams = undefined
        before.completed = false
        setStack([...smallerRest, before])
      }
    })
    return unsubscribe
  }, [])

  return {
    params: params as NonNullable<typeof params>,
    complete: (item: any) => {
      const [last, rest] = arraysTail(stack)

      if (last === undefined)
        throw new StackFlowError(
          `tried to complete '${String(screen)}' before starting`
        )

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
        ...rest,
        {
          screenName: last.screenName,
          completed: true,
          inParams: last.inParams,
          outParams: item,
        },
      ]

      const { nextStep } = walkStack(flow, newStack)

      if (nextStep === null) {
        return
      } else if (nextStep.action === "navigate") {
        setStack([
          ...newStack,
          {
            screenName: nextStep.to as string,
            completed: false,
            inParams: nextStep.params,
          },
        ])
        navigate(nextStep.to as any, nextStep.params as any)
      } else {
        throw new StackFlowError(`unknown action: ${nextStep.action}`)
      }
    },
  }
}
