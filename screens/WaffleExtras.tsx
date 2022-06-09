import React from "react"
import { Picker } from "../components/Picker"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"

const waffleExtras = ["plain", "m&m's", "cream"] as const
export type WaffleExtra = typeof waffleExtras[number]

export type ReturnParams = {
  container: WaffleExtra
}

export const WaffleExtrasPicker: React.FC = () => {
  const { complete } = useIceCreamOrderStackFlow("WaffleExtrasPicker")
  return <Picker items={waffleExtras} onSelect={complete} />
}
