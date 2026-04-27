import { contextBridge, ipcRenderer } from "electron"
import { INoteData } from "./shared/types"

/**
 * Send windowControl commands to the main process
 */
const renderer = {
  isMac: process.platform === "darwin",
  windowControl: (action: "close" | "maximize" | "minimize") => {
    ipcRenderer.send("mainWindow-control", action)
  },
  setNote: async (data: any): Promise<INoteData[]> => {
    const response = await ipcRenderer.invoke("setNote", data)

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
