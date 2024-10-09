interface IGrade {
  grade: number
  visible: boolean
}
interface ITypeAssessment {
  typeAssessment: string
  visible: boolean
}
interface ISubject {
  subject: string
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
  elementId: string
}
interface IFinalAssessment {
  average: string
}

export type { IFinalAssessment, IGrade, IHeadLine, IHeader, ISubject, ITableContent, ITypeAssessment }
