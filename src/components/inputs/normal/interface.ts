interface IInput {
  inputType: 'text' | 'number' | 'email' | 'file' | 'date' | 'password'
  className?: string
  onClick?: () => void
  Icon?: any
  iconClick?: () => void
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
  value?: string
  hiddenErrorMessage?: boolean
}

export type { IInput }
