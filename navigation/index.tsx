import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { ContainerPicker } from "../screens/ContainerPicker"

import { FlavorPicker } from "../screens/FlavorPicker"
import { SummaryScreen } from "../screens/SummaryScreen"
import { WaffleExtrasPicker } from "../screens/WaffleExtras"
import { RootStackParamList } from "../types"
import { useCreateIceCreamOrderStackFlow } from "./IceCreamOrderStackFlow"
import { StackFlowProvider } from "./StackFlow"

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
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
  const { flow, initialRouteName } = useCreateIceCreamOrderStackFlow()

  return (
    <StackFlowProvider flow={flow}>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="FlavorPicker" component={FlavorPicker} />
        <Stack.Screen name="ContainerPicker" component={ContainerPicker} />
        <Stack.Screen
          name="WaffleExtrasPicker"
          component={WaffleExtrasPicker}
        />
        <Stack.Screen name="SummaryScreen" component={SummaryScreen} />
      </Stack.Navigator>
    </StackFlowProvider>
  )
}
