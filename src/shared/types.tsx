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
  type: string
  content: TNoteBlock[]
}

export type TNoteBlock = {
  type: string
  content: [
    {
      type: string
      text: string
    },
  ]
}

// Example of Note
//     "type": "doc",
//     "content": [
//         {
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
