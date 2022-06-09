import { Container } from "./screens/ContainerPicker"
import { Flavor } from "./screens/FlavorPicker"
import { WaffleExtra } from "./screens/WaffleExtras"

declare global {
  namespace ReactNavigation {
    interface RootParamList extends IceCreamOrderStackParamList {}
  }
}

export type IceCreamOrderStackParamList = {
  FlavorPicker: undefined
  ContainerPicker: undefined
  WaffleExtrasPicker: undefined
  SummaryScreen: {
    flavor: Flavor
    container: Container
    waffleExtras: WaffleExtra | null
  }
}

export type IceCreamOrderStackReturnParamList = {
  FlavorPicker: Flavor
  ContainerPicker: Container
  WaffleExtrasPicker: WaffleExtra
  SummaryScreen: undefined
}
