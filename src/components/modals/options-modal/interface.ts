import type { ReactNode } from 'react'

interface IOptionsModal {
  modalState: boolean
  className?: string
  children: ReactNode
  maximumHeight?: boolean
}

export type { IOptionsModal }
