import type { Dispatch, SetStateAction } from 'react'

interface ISelectedLevel {
  id: number
  level: string
  ordinalFormClass: string
}
interface IUseContextType {
  selectedLevel: ISelectedLevel
  setSelectedLevel: Dispatch<SetStateAction<ISelectedLevel>>
}

export type { ISelectedLevel, IUseContextType }
