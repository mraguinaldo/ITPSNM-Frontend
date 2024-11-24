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

interface IButtonOptionsForEmployee {
  onClick: () => void,
  content: string,
  Icon: any
}


export type { 
  IHeader, 
  IProperty, 
  IHeadLine, 
  ITableContent, 
  IFinalAssessment, 
  IButtonOptionsForEmployee 
}
