import { userFriendlyTime } from "@/shared/functions"
import { TNote } from "@/shared/types"
import { Maximize, Minus, Section, X } from "lucide-react"
import React from "react"

export const WindowButtons = React.memo((props: any) => {
  return (
    <div className="window-buttons flex [&>div]:hover:bg-[#e7e5e4] dark:[&>div]:hover:bg-[#1c1917]">
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("minimize")}
      >
        <Minus className="w-5 h-5 text-black dark:text-[#e7e5e4]" />
      </button>
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("maximize")}
      >
        <Maximize className="w-5 h-5 text-black dark:text-[#e7e5e4]" />
      </button>
      <button
        className="p-2 flex justify-center align-center hover:bg-blue-200"
        onClick={() => window.electron.windowControl("close")}
      >
        <X className="w-5 h-5 text-black dark:text-[#e7e5e4]" />
      </button>
    </div>
  )
})

export const NotesItem = React.memo((props: any) => {
  if (!props.note.note || !props.note.note.blocks) return null
  const time = userFriendlyTime(props.note.note.time)
  const data = props.note?.note?.blocks[0]?.data?.text || "Empty note..."

  return (
    <div className="w-full p-4 [&.active]:rounded-xl">
      <div className="font-bold text-base">{data}</div>
      <div className="flex text-xs text-stone-800 dark:text-stone-300">
        <div>{time}</div>
        <div className="flex-1 ml-2 truncate">{data}</div>
      </div>
    </div>
  )
})

export const NotesList = React.memo((props: any) => {
  return (
    <div className="w-full p-3">
      <div className="text-lg">{props.section}</div>
      <div className="divide-y-2 divide-y-stone-700 dark:divide-y-stone-400">
        {props.data.map((note: any) => (
          <NotesItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
})
