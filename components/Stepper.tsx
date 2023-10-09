import { View, Text } from "react-native"
import { CyanButton } from "./CyanButton"
import tw from "twrnc"

type Props = {
  label: string
  value: number
  onChange: (value: number) => void
}

export const Stepper: React.FC<Props> = ({ label, value, onChange }) => {
  return (
    <View style={tw.style("flex-row gap-4")}>
      <Text>{label}</Text>
      <CyanButton label="-" onPress={() => onChange(value - 1)} />
      <Text>{value}</Text>
      <CyanButton label="+" onPress={() => onChange(value + 1)} />
    </View>
  )
}
