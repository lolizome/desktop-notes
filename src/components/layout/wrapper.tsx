import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { WindowButtons } from "../shared-components"
import Editor from "./editor"

export const Wrapper = React.memo((props: any) => {
  return (
    <div className="h-[100vh] w-[100%]">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}>
          <div className="h-[40px] w-[100%] border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-center"></div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <div className="h-[40px] w-[100%] border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-end">
            {!window.electron.isMac && <WindowButtons />}
          </div>
          <Editor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
})
