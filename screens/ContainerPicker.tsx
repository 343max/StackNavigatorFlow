import React from "react"
import { Picker } from "../components/Picker"

const containers = ["Waffle", "Donut", "Take Away Box"] as const
export type Container = typeof containers[number]

export type ReturnParams = {
  container: Container
}

export const ContainerPicker: React.FC = () => {
  return <Picker items={containers} onSelect={(item) => alert(item)} />
}
