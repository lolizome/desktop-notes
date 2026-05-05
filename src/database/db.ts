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
  const noteContent =
    typeof data.note === "object" ? JSON.stringify(data.note) : data.note

  db.serialize(() => {
    createTable()

    const stmt = db.prepare(
      "INSERT OR REPLACE INTO notes (id, note) VALUES (?, ?)",
    )
    stmt.run(data.id, noteContent, (err: Error | null) => {
      if (err) {
        console.error(err)
        return
      }
      getAllNotes(callback)
    })
    stmt.finalize()
  })
}

export const getAllNotes = (callback: Function) => {
  db.serialize(() => {
    db.all("SELECT * FROM notes ORDER BY id DESC", (err, rows) => {
      if (err) return null
      const parsedData = rows.map((row: any) => {
        try {
          return {
            ...row,
            note: JSON.parse(row.note),
          }
        } catch (error) {
          return row
        }
      })

      callback(parsedData)
    })
  })
}
