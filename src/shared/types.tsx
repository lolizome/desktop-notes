export interface IMainState extends IMainStateObject {
  set_state: (title: keyof IMainStateObject, value: any) => void
}

export interface IMainStateObject {
  activeNote: any
}

export interface INoteData {
  id: number | null
  note: string | TNote
}

export type TNote = {
  time: number
  blocks: TNoteBlock[]
  type: string
}

export type TNoteBlock = {
  id: string
  type: string
  data: {
    text: string
  }
}

// Example of Note
//     "type": "doc",
//     "content": [
//         {
//             "time": "number",
//             "type": "paragraph",
//             "content": [
//                 {
//                     "type": "text",
//                     "text": "Start to write...dfgd"
//                 }
//             ]
//         }
//     ]
// }
