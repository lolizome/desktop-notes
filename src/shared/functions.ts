import { INoteData, TNote } from "./types"

export const userFriendlyTime = (tStamp: number) => {
  const now = Date.now()
  const date = new Date(tStamp)
  const aWeekAgo = now - 1000 * 60 * 60 * 24 * 7
  const aDayAgo = now - 1000 * 60 * 60 * 24

  if (tStamp > aDayAgo) {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  if (tStamp > aWeekAgo) {
    return date.toLocaleDateString(undefined, { weekday: "long" })
  }

  return date.toLocaleDateString()
}

export const sectionizeNotes = (notes: INoteData[]) => {
  const now = Date.now()
  const msInDay = 1000 * 60 * 60 * 24
  const todayStart = now - msInDay
  const yesterdayStart = now - msInDay * 2

  const parsedNotes = notes.map((note) => ({
    ...note,
    note: typeof note.note === "string" ? JSON.parse(note.note) : note.note,
  })) as (INoteData & { note: TNote })[]
  parsedNotes.sort((a, b) => b.note.time - a.note.time)

  const sections: Record<string, any[]> = {}

  parsedNotes.forEach((note) => {
    const noteTime = note.note.time
    let label = ""

    if (noteTime >= todayStart) {
      label = "today"
    } else if (noteTime >= yesterdayStart) {
      label = "yesterday"
    } else {
      label = "previous"
    }

    if (!sections[label]) sections[label] = []
    sections[label].push(note)
  })

  return sections
}
