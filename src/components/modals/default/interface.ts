import type { ReactNode } from 'react'

interface IDefaultModal {
  display: boolean
  children: ReactNode
  closeModal: () => void
}

export type { IDefaultModal }
