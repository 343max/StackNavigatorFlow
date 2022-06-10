import React from "react"
import { View, Text } from "react-native"
import tw from "twrnc"
import { CyanButton } from "../components/CyanButton"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"

export const SummaryScreen: React.FC = () => {
  const { params, complete } = useIceCreamOrderStackFlow("SummaryScreen")
  const { flavor, container, waffleExtras } = params
  console.log({ flavor, container, waffleExtras })
  return (
    <View style={tw.style("flex-1 align-center items-center")}>
      <Text>Flavor: {flavor}</Text>
      <Text>Container: {container}</Text>
      {waffleExtras !== null ? (
        <Text>Waffle Extras: {waffleExtras}</Text>
      ) : null}
      <CyanButton onPress={complete} label="Start over" />
    </View>
  )
}
