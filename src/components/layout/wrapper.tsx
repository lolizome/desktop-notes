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
import { INoteData } from "@/shared/types"

declare global {
  interface WindowEventMap {
    allNotesData: CustomEvent<INoteData[]>
  }
}

export const Wrapper = React.memo((props: any) => {
  const activeNote = useMainStore((state) => state.activeNote)
  const setState = useMainStore((state) => state.set_state)
  const [notes, setNotes] = React.useState<INoteData[]>([])

  const handleCreateNote = React.useCallback(async () => {
    const dummyData = {
      id: null,
      note: "",
    } as INoteData

    const updatedNotes = await window.electron.setNote(dummyData, false)
    if (updatedNotes) {
      setState("activeNote", updatedNotes[0])
      setNotes(updatedNotes)
    }
    // setNotes(notes)
  }, [setNotes])

  React.useLayoutEffect(() => {
    const handler = (ev: Event & { detail: INoteData[] }) => {
      console.log("ev", ev.detail)
      if (ev.detail[0] && ev.detail[0].id! == activeNote?.id) {
        setState("activeNote", ev.detail[0])
      }
      setNotes(notes)
    }
    window.addEventListener("allNotesData", handler)
    return () => window.removeEventListener("allNotesData", handler)
  }, [notes])

  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={30} defaultSize={35}>
          <div className="w-full h-10 border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-center"></div>
          {notes.map((note) => (
            <div key={note.id}> {note.id}</div>
          ))}
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
