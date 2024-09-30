import { actions } from './actions'

const reducer = (state: any, action: any) => {
  const { payload } = action
  switch (action.type) {
    case actions.changeStateOfChevron:
      return {
        ...state,
        chevronState: payload,
      }
    case actions.toggleModalState:
      return {
        ...state,
        modalState: payload,
      }
    case actions.changeLevel:
      return {
        ...state,
        level: payload,
      }
    case actions.switchSubject:
      return {
        ...state,
        subject: payload,
      }
    case actions.toggleQuarter:
      return {
        ...state,
        quarter: payload,
      }

    default:
      return {
        ...state,
      }
  }
}

export { reducer }
