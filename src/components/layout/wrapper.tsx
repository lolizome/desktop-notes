import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"
import { WindowButtons } from "@/components/SharedComponents"
import Editor from "./Editor"
import { useMainStore } from "@/shared/useMainStore"
import EmptyNote from "./EmptyNote"

export const Wrapper = React.memo((props: any) => {
  const activeNote = useMainStore((state) => state.activeNote)
  const handleCreateNote = React.useCallback(() => {
    const dummyData = {
      id: null as any,
      note: "",
    }
  }, [])
  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}>
          <div className="w-full h-10 border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-center"></div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30}>
          <div className="w-full h-10 border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-end">
            {!window.electron.isMac && <WindowButtons />}
          </div>
          {activeNote == null ? (
            <EmptyNote newNote={handleCreateNote} />
          ) : (
            <Editor />
          )}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
})
