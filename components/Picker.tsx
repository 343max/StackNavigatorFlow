import React from "react"
import { FlatList, TouchableOpacity, Text, View } from "react-native"
import tw from "twrnc"

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
      renderItem={({ item }) => (
        <View key={item} style={tw.style("px-5 py-2")}>
          <TouchableOpacity
            key={item}
            style={tw.style("items-center bg-cyan-500 p-2 rounded-2")}
            onPress={() => onSelect(item)}
          >
            <Text style={tw.style("text-white font-bold")}>{item}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )
}
