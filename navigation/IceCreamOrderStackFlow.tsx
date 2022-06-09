import {
  IceCreamOrderStackParamList,
  IceCreamOrderStackReturnParamList,
} from "../types"
import { useCreateStackFlow, useStackFlow } from "../StackFlow/StackFlow"

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
  >(({ start, navigate }) => {
    const flavor = start("FlavorPicker")
    const container = navigate("ContainerPicker")
    const waffleExtras =
      container === "Waffle" ? navigate("WaffleExtrasPicker") : null
    navigate("SummaryScreen", { flavor, container, waffleExtras })
  })
