import { contextBridge, ipcRenderer } from "electron"

/**
 * Send windowControl commands to the main process
 */
const renderer = {
  isMac: process.platform === "darwin",
  windowControl: (action: "close" | "maximize" | "minimize") => {
    ipcRenderer.send("mainWindow-control", action)
  },
}

contextBridge.exposeInMainWorld("electron", renderer)

export type IRenderer = typeof renderer
