import React from "react"
import { View, Text } from "react-native"
import { RootStackParamList } from "../types"
import tw from "twrnc"

export const SummaryScreen: React.FC<RootStackParamList["SummaryScreen"]> = ({
  flavor,
  container,
  waffleExtras,
}) => {
  const items = [
    flavor,
    container,
    ...(waffleExtras === null ? [] : [waffleExtras]),
  ]
  return (
    <View style={tw.style("flex-1 align-center items-center")}>
      {items.map((item) => (
        <Text>{item}</Text>
      ))}
    </View>
  )
}
