import { INoteData } from "@/shared/types"
import sqlite3 from "sqlite3"

const sqlite = sqlite3.verbose()
const db = new sqlite.Database("notes.sql")

const createTable = () => {
  db.run(
    "CREATE TABLE IF NOT EXISTS notes (id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, note TEXT)",
  )
}

export const setNote = (data: INoteData, callback: Function) => {
  db.serialize(() => {
    createTable()

    const stmt = db.prepare(
      "INSERT OR REPLACE INTO notes (id, note) VALUES (?, ?)",
    )
    stmt.run(data.id, data.note, (err: Error | null) => {
      if (err) {
        console.error(err)
        return
      }
      getAllNote(callback)
    })
    stmt.finalize()
  })
}

export const getAllNote = (callback: Function) => {
  db.serialize(() => {
    db.all("SELECT * FROM notes ORDER BY id DESC", (err, data) => {
      if (err) return null
      callback(data)
    })
  })
}

// db.close()
