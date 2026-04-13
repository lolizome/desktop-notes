import React from "react"
import TipTapEditor from "./TiptapTemplate"
import { ScrollArea } from "@/components/ui/ScrollArea"

export default React.memo((props: any) => {
  const handleChange = React.useCallback((api: any, ev: any) => {
    console.log("api", api)
  }, [])
  return (
    <ScrollArea className="h-[calc(100%-40px)]">
      <TipTapEditor onChange={handleChange} />
    </ScrollArea>
  )
})
