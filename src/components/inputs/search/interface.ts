interface IInputSearch {
  placeholder: string
  icon: any
  onChange: (e: any) => void
  className?: string
  onKeyDown?: (e: any) => void
  value?: string
}

export type { IInputSearch }
