import React from "react"
import { FlatList, TouchableOpacity, Text, View } from "react-native"
import tw from "twrnc"
import { CyanButton } from "./CyanButton"

type Props<T extends string> = {
  items: readonly T[]
  onSelect: (item: T) => void
}

export const Picker = <T extends string>({
  items,
  onSelect,
}: Props<T>): JSX.Element => {
  return (
    <FlatList
      style={tw.style("flex-1 bg-white")}
      data={items}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={tw.style("px-5 py-2")}>
          <CyanButton onPress={() => onSelect(item)} label={item} />
        </View>
      )}
    />
  )
}
