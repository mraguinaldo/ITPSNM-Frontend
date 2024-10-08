interface IProperty {
  property?: any
}
interface ITableContent {
  error: any
  isLoading: boolean
  notes: any
}
type IHeadLine = {
  colSpan: number
  visible: boolean
  content: string
}
interface IHeader {
  user: any
}
interface IFinalAssessment {
  average: number
}

export type { IFinalAssessment, IProperty, IHeadLine, IHeader, ITableContent }
