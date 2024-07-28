interface ICHILDREN {
  id: number
  content: string
  target?: string
  Icon?: any
  element?: string
}

interface IFOOTERDATA {
  id: number
  title: string
  children: ICHILDREN[]
}

export type { IFOOTERDATA }
