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
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  FlavorPicker: undefined
  ContainerPicker: undefined
  WaffleExtrasPicker: undefined
  SummaryScreen: {
    flavor: Flavor
    container: Container
    waffleExtras: WaffleExtra | null
  }
}

export type RootStackReturnParamList = {
  FlavorPicker: Flavor
  ContainerPicker: Container
  WaffleExtrasPicker: WaffleExtra
  SummaryScreen: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >
