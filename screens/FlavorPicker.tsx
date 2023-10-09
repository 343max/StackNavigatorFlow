import React from "react"
import { Picker } from "../components/Picker"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"
import { Stepper } from "../components/Stepper"

const flavors = ["Chocolate", "Strawberry", "Vanilla"] as const
export type Flavor = (typeof flavors)[number]

export type ReturnParams = {
  flavor: Flavor
}

export const FlavorPicker: React.FC = () => {
  const { complete } = useIceCreamOrderStackFlow("FlavorPicker")
  const [waffleCount, setWaffleCount] = React.useState(1)
  return (
    <>
      <Stepper
        label="waffle count"
        value={waffleCount}
        onChange={setWaffleCount}
      />
      <Picker items={flavors} onSelect={complete} />
    </>
  )
}
