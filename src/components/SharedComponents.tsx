import { Maximize, Minus, X } from "lucide-react"
import React from "react"

export const WindowButtons = React.memo((props: any) => {
  return (
    <div className="window-buttons flex [&>div]:hover:bg-[#e7e5e4] dark:[&>div]:hover:bg-[#1c1917]">
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("minimize")}
      >
        <Minus className="w-[20px] h-[20px] text-black dark:text-[#e7e5e4]" />
      </button>
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("maximize")}
      >
        <Maximize className="w-[20px] h-[20px] text-black dark:text-[#e7e5e4]" />
      </button>
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("close")}
      >
        <X className="w-[20px] h-[20px] text-black dark:text-[#e7e5e4]" />
      </button>
    </div>
  )
})

export const notesItem = React.memo((props: any) => {
  return (
    <div>
      <div></div>
    </div>
  )
})
