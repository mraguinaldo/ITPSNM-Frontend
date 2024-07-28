import type { ReactNode } from 'react'

interface IButton {
  content: string
  className?: string
  Icon?: ReactNode
  type: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

export type { IButton }
