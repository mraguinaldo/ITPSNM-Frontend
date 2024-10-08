import { actions } from './actions'
import { initialValues } from './data'

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
      case actions.reset:
        return {
          initialValues
        }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
