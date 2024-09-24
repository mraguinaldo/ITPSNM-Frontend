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

    case actions.toggleLevel:
      return {
        ...state,
        level: payload,
      }
    case actions.addCourse:
      return {
        ...state,
        course: payload,
      }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
