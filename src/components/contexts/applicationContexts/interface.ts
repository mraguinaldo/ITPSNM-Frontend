import type { Dispatch, SetStateAction } from 'react'
import type { IEnrollments } from '../../../interfaces/interfaces'

interface ISelectedLevel {
  id: number
  content: string
  level: string
}

interface IEnrollmentNumber {
  id?: number
}

interface IStudentsFound {
  students: IEnrollments
}

interface IUseContextType {
  selectedLevel: ISelectedLevel
  setSelectedLevel: Dispatch<SetStateAction<ISelectedLevel>>
  enrollmentNumber: IEnrollmentNumber
  setEnrollmentNumber: Dispatch<SetStateAction<IEnrollmentNumber>>
  identityCardNumber: IEnrollmentNumber
  setIdentityCardNumber: Dispatch<SetStateAction<IEnrollmentNumber>>
  studentsFound: IStudentsFound
  setStudentsFound: Dispatch<SetStateAction<IStudentsFound>>
}

export type { ISelectedLevel, IUseContextType, IEnrollmentNumber, IStudentsFound }
