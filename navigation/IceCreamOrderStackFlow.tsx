import {
  IceCreamOrderStackParamList,
  IceCreamOrderStackReturnParamList,
} from "../types"
import { useCreateStackFlow } from "../StackFlow/StackFlow"
import { useStackFlow } from "../StackFlow/useStackFlow"

export const useIceCreamOrderStackFlow = <
  RouteName extends keyof IceCreamOrderStackParamList
>(
  screenName: RouteName
) =>
  useStackFlow<
    IceCreamOrderStackParamList,
    IceCreamOrderStackReturnParamList,
    RouteName
  >(screenName)

export const useCreateIceCreamOrderStackFlow = () =>
  useCreateStackFlow<
    IceCreamOrderStackParamList,
    IceCreamOrderStackReturnParamList
  >(({ start, navigate, startOver }) => {
    const flavor = start("FlavorPicker")
    const container = navigate("ContainerPicker")
    const waffleExtras =
      container === "Waffle" ? navigate("WaffleExtrasPicker") : null
    navigate("SummaryScreen", { flavor, container, waffleExtras })
    startOver()
  })
