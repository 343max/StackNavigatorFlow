import React from "react"
import { Picker } from "../components/Picker"
import { useIceCreamOrderStackFlow } from "../navigation/IceCreamOrderStackFlow"

const containers = ["Waffle", "Donut", "Take Away Box"] as const
export type Container = typeof containers[number]

export type ReturnParams = {
  container: Container
}

export const ContainerPicker: React.FC = () => {
  const { complete } = useIceCreamOrderStackFlow("ContainerPicker")
  return <Picker items={containers} onSelect={complete} />
}
