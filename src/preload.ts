import { contextBridge, ipcRenderer } from "electron"

/**
 * Send windowControl commands to the main process
 */
const renderer = {
  isMac: process.platform === "darwin",
  windowControl: (action: "close" | "maximize" | "minimize") => {
    ipcRenderer.send("mainWindow-control", action)
  },
  setNote: async (data: any) => {
    const notes = await ipcRenderer.invoke("setNote", data)
    console.log("notes", notes)
    return notes
  },
}

contextBridge.exposeInMainWorld("electron", renderer)

export type IRenderer = typeof renderer
