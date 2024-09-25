import type { Dispatch, SetStateAction } from 'react'

interface ISelectedLevel {
  id: number
  content: string
  level: string
}

interface IEnrollmentNumber {
  id: number
}

interface IUseContextType {
  selectedLevel: ISelectedLevel
  setSelectedLevel: Dispatch<SetStateAction<ISelectedLevel>>
  enrollmentNumber: IEnrollmentNumber
  setEnrollmentNumber: Dispatch<SetStateAction<IEnrollmentNumber>>
}

export type { ISelectedLevel, IUseContextType, IEnrollmentNumber }
