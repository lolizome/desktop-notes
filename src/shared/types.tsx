export interface IMainState extends IMainStateObject {
  set_state: (title: keyof IMainStateObject, value: any) => void
}

export interface IMainStateObject {
  activeNote: any
}

export interface INoteData {
  id: number | null
  note: string
}
