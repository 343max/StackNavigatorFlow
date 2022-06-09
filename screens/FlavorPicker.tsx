import React from "react"
import { Picker } from "../components/Picker"

const flavors = ["Chocolate", "Strawberry", "Vanilla"] as const
export type Flavor = typeof flavors[number]

export type ReturnParams = {
  flavor: Flavor
}

export const FlavorPicker: React.FC = () => {
  return <Picker items={flavors} onSelect={(item) => alert(item)} />
}
