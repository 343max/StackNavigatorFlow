import { RootStackParamList, RootStackReturnParamList } from "../types"
import { useCreateStackFlow, useStackFlow } from "./StackFlow"

export const useIceCreamOrderStackFlow = <
  RouteName extends keyof RootStackParamList
>(
  screenName: RouteName
) =>
  useStackFlow<RootStackParamList, RootStackReturnParamList, RouteName>(
    screenName
  )

export const useCreateIceCreamOrderStackFlow = () =>
  useCreateStackFlow<RootStackParamList, RootStackReturnParamList>(
    ({ start, navigate }) => {
      const flavor = start("FlavorPicker")
      const container = navigate("ContainerPicker")
      const waffleExtras =
        container === "Waffle" ? navigate("WaffleExtrasPicker") : null
      navigate("SummaryScreen", { flavor, container, waffleExtras })
    }
  )
