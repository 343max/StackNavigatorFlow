import React from "react"
import { Picker } from "../components/Picker"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"
import { Stepper } from "../components/Stepper"

const waffleExtras = ["plain", "m&m's", "cream"] as const
export type WaffleExtra = (typeof waffleExtras)[number]

export type ReturnParams = {
  container: WaffleExtra
}

export const WaffleExtrasPicker: React.FC = () => {
  const { complete } = useIceCreamOrderStackFlow("WaffleExtrasPicker")
  const [waffleCount, setWaffleCount] = React.useState(1)
  return (
    <>
      <Stepper
        label="waffle count"
        value={waffleCount}
        onChange={setWaffleCount}
      />
      <Picker items={waffleExtras} onSelect={complete} />
    </>
  )
}
