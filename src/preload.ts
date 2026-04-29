import { contextBridge, ipcRenderer } from "electron"
import { INoteData } from "@/shared/types"
import { broadcastEvent } from "@/shared/events"

ipcRenderer.on("onStartNotes", (ev, data) => {
  setTimeout(() => {
    window.dispatchEvent(broadcastEvent("allNotesData", data))
  }, 0)
})

/**
 * Send windowControl commands to the main process
 */
const renderer = {
  isMac: process.platform === "darwin",
  windowControl: (action: "close" | "maximize" | "minimize") => {
    ipcRenderer.send("mainWindow-control", action)
  },
  setNote: async (data: any, explicit: boolean): Promise<INoteData[]> => {
    const response = await ipcRenderer.invoke("setNote", data)
    console.log("response", response)

    if (explicit) {
      window.dispatchEvent(broadcastEvent("allNotesData", response))
      return data
    }
    if (response.success) {
      return response.savedData
    } else {
      console.error(response.error)
      return []
    }
  },
}

contextBridge.exposeInMainWorld("electron", renderer)

export type IRenderer = typeof renderer
