import React from "react"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"
import { NotesList, WindowButtons } from "@/components/SharedComponents"
import Editor from "./Editor"
import { useMainStore } from "@/shared/useMainStore"
import EmptyNote from "./EmptyNote"
import { INoteData } from "@/shared/types"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { sectionizeNotes } from "@/shared/functions"

declare global {
  interface WindowEventMap {
    allNotesData: CustomEvent<{ success: boolean; savedData: INoteData[] }>
  }
}

export const Wrapper = React.memo((props: any) => {
  const activeNote = useMainStore((state) => state.activeNote)
  const setState = useMainStore((state) => state.set_state)

  const [notes, setNotes] = React.useState<INoteData[]>([])
  const sectionNotes = React.useMemo(() => sectionizeNotes(notes), [notes])

  const handleCreateNote = React.useCallback(async () => {
    const dummyData = {
      id: null,
      note: "",
    } as INoteData

    const updatedNotes = await window.electron.setNote(dummyData, false)
    console.log("Wrapper-updatedNotes", updatedNotes)
    if (updatedNotes) {
      setState("activeNote", updatedNotes[0])
      setNotes(updatedNotes)
    }
  }, [setState])

  React.useEffect(() => {
    const handler = (ev: Event & { detail: { savedData: INoteData[] } }) => {
      const incomingNotes = ev.detail.savedData
      const firstNote = ev.detail.savedData?.[0]

      if (incomingNotes) setNotes(incomingNotes)
      if (firstNote?.id !== activeNote?.id) setState("activeNote", firstNote)
    }

    window.addEventListener("allNotesData", handler as any)
    return () => window.removeEventListener("allNotesData", handler as any)
  }, [activeNote, setState])

  console.log("Wrapper-notes", notes)

  return (
    <div className="w-full h-screen">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel minSize={150} defaultSize={255}>
          <div className="w-full h-10 border-b-[.5px] border-b-stone-300 dark:stone:border-b-stone-800 app-wrapper flex justify-center"></div>
          <ScrollArea className="h-[calc(100%-40px)]">
            {Object.entries(sectionNotes).map(([sectionName, notes]) => (
              <React.Fragment key={sectionName}>
                <pre className="text-xs text-red-500">
                  {sectionName}: {notes.length} notas
                </pre>
                <NotesList section={sectionName} data={notes} />
              </React.Fragment>
            ))}
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel minSize={200}>
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
