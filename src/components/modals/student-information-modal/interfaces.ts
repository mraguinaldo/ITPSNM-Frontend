import type { ReactNode } from 'react'

interface IStudentInformationModal {
  children: ReactNode
  visible: boolean
  toggleStateModal: () => void
}

export type { IStudentInformationModal }
