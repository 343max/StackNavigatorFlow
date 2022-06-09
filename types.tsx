/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
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
