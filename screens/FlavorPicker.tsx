import React from "react"
import { Picker } from "../components/Picker"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"

const flavors = ["Chocolate", "Strawberry", "Vanilla"] as const
export type Flavor = typeof flavors[number]

export type ReturnParams = {
  flavor: Flavor
}

export const FlavorPicker: React.FC = () => {
  const { complete } = useIceCreamOrderStackFlow("FlavorPicker")
  return <Picker items={flavors} onSelect={complete} />
}
