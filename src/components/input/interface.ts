interface IInput {
  inputType: 'text' | 'number' | 'email' | 'file' | 'date'
  className?: string
  onClick?: () => void
  Icon?: any
  placeholder?: string
  errorMessage?: string | undefined
  option?: boolean
  fileName?: string
  name?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  label: string
  chevronState?: boolean
  hiddenLabel?: boolean
}

export type { IInput }
