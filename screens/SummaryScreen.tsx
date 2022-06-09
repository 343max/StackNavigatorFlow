import React from "react"
import { View, Text } from "react-native"
import tw from "twrnc"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"

export const SummaryScreen: React.FC = () => {
  const { params: params2 } = useIceCreamOrderStackFlow("SummaryScreen")
  const { flavor, container, waffleExtras } = params2
  console.log({ flavor, container, waffleExtras })
  return (
    <View style={tw.style("flex-1 align-center items-center")}>
      <Text>Flavor: {flavor}</Text>
      <Text>Container: {container}</Text>
      {waffleExtras !== null ? (
        <Text>Waffle Extras: {waffleExtras}</Text>
      ) : null}
    </View>
  )
}
