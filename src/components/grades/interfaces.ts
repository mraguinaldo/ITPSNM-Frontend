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
  user: any
}
type IHeadLine = {
  colSpan: number
  visible: boolean
  content: string
}
interface IHeader {
  user: any
  details: any[]
}
interface IFinalAssessment {
  average: number
}

export type { IFinalAssessment, IGrade, IHeadLine, IHeader, ISubject, ITableContent, ITypeAssessment }
