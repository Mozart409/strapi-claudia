import React, { ReactElement } from "react"

interface Props {
  text: string
}

export default function CustomButton({ text }: Props): ReactElement {
  return (
    <div>
      <button className="items.center bg-lava-orange-500 hover:bg-rubber-gray focus:ring-lava-orange-500 mx-auto inline-flex items-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
        {text}
      </button>
    </div>
  )
}
