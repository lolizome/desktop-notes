import React from "react"
import TipTapEditor from "./TiptapTemplate"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { useMainStore } from "@/shared/useMainStore"

export default React.memo((props: any) => {
  const activeNote = useMainStore((state) => state.activeNote)
  const handleChange = React.useCallback((data: any, ev: any) => {
    console.log("api", data)
    window.electron.setNote(
      {
        id: activeNote.id,
        note: JSON.stringify(data),
      },
      true,
    )
  }, [])
  return (
    <ScrollArea className="h-[calc(100%-40px)]">
      <TipTapEditor onChange={handleChange} />
    </ScrollArea>
  )
})
