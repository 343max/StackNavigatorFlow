import React from "react"
import { Picker } from "../components/Picker"

const waffleExtras = ["plain", "m&m's", "cream"] as const
export type WaffleExtra = typeof waffleExtras[number]

export type ReturnParams = {
  container: WaffleExtra
}

export const WaffleExtrasPicker: React.FC = () => {
  return <Picker items={waffleExtras} onSelect={(item) => alert(item)} />
}
