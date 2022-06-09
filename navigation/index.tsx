import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ColorSchemeName } from "react-native"
import { ContainerPicker } from "../screens/ContainerPicker"

import { FlavorPicker } from "../screens/FlavorPicker"
import { WaffleExtrasPicker } from "../screens/WaffleExtras"
import { RootStackParamList } from "../types"
import LinkingConfiguration from "./LinkingConfiguration"

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FlavorPicker" component={FlavorPicker} />
      <Stack.Screen name="ContainerPicker" component={ContainerPicker} />
      <Stack.Screen name="WaffleExtrasPicker" component={WaffleExtrasPicker} />
    </Stack.Navigator>
  )
}
