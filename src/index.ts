import { app, BrowserWindow, ipcMain } from "electron"
import sqlite3 from "sqlite3"
import { getAllNotes, setNote } from "./database/db"
import { INoteData } from "@/shared/types"

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

if (require("electron-squirrel-startup")) {
  app.quit()
}

ipcMain.on(
  "mainWindow-control",
  (ev, action: "close" | "maximize" | "minimize") => {
    const win = BrowserWindow.fromWebContents(ev.sender)
    if (!win || win.isDestroyed()) return

    const actions = {
      close: () => win.destroy(),
      maximize: () => (win.isMaximized() ? win.unmaximize() : win.maximize()),
      minimize: () => win.minimize(),
    }

    actions[action]?.()
  },
)

ipcMain.handle("setNote", async (ev, args) => {
  return new Promise((resolve) => {
    setNote(args, (result: any) => {
      if (result) {
        resolve({ success: true, savedData: result })
      } else {
        resolve({ success: false, error: "Error to fetch notes" })
      }
    })
  })
})

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    frame: false, // remove titleBar on Windows
    titleBarStyle: "hidden",
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Show macOS traffic light buttons only on Darwin (MacOS) to avoid errors on other platforms
  process.platform === "darwin" && mainWindow.setWindowButtonVisibility(true)

  mainWindow.webContents.openDevTools()

  getAllNotes((data: INoteData) => {
    mainWindow.webContents.send("onStartNotes", data)
  })
}

app.on("ready", createWindow)

// Quit when all windows are closed, except on macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
