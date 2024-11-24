interface IButtonToChangeLevel {
  id: number,
  currentLevelId: number,
  onClick: () => void,
  level: string
}

interface IConfirmationDetailsViewer {
  fullName: string,
  level: string,
  classRoom: string,
  period: string
}

interface IHeaderContent {
  content: string
}

interface IStudentOptionsButton {
  onClick: () => void,
  option: string,
  isBlocked: boolean,
  Icon: any
}

interface IStudentOptionsLink {
  onClick: () => void,
  href: string,
  option: string,
  Icon: any
}

export type { 
  IButtonToChangeLevel, 
  IConfirmationDetailsViewer, 
  IHeaderContent,
  IStudentOptionsButton, 
  IStudentOptionsLink 
}