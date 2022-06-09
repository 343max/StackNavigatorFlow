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
    async ({ navigate }) => {
      const flavor = await navigate("FlavorPicker")
      const container = await navigate("ContainerPicker")
      const waffleExtras =
        container === "Waffle" ? await navigate("WaffleExtrasPicker") : null
      await navigate("SummaryScreen", { flavor, container, waffleExtras })
    }
  )
