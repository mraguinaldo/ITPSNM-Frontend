interface IQuestionModal {
  visible: boolean
  confirm: () => void
  reject: () => void
  iconConfirm: any
  iconReject: any
  title: string
  paragraph?: string
}

export type { IQuestionModal }
