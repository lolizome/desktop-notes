import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { IMainState } from "./types"
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface BearState {
  bears: number
  increase: (by: number) => void
}

export const useMainStore = create<IMainState>()(
  persist(
    (set) => ({
      activeNote: null as any,
      set_state: (title, value) => {
        switch (title) {
          case "activeNote":
            set((state) => ({ activeNote: value }))
            break

          default:
            break
        }
      },
    }),
    {
      name: "app-main-storage",
    },
  ),
)
