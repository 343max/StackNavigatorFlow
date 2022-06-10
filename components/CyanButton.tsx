import React from "react"
import { TouchableOpacity, Text } from "react-native"
import tw from "twrnc"

export const CyanButton: React.FC<{ onPress: () => void; label: string }> = ({
  onPress,
  label,
}) => (
  <TouchableOpacity
    style={tw.style("items-center bg-cyan-500 p-2 rounded-2")}
    onPress={onPress}
  >
    <Text style={tw.style("text-white font-bold")}>{label}</Text>
  </TouchableOpacity>
)
