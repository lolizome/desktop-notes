import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export const Wrapper = React.memo((props: any) => {
  return (
    <div className="h-[100vh] w-[100%]">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}></ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}></ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
})
