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
    case actions.toggleUserType:
      return {
        ...state,
        role: payload,
      }
    case actions.changeInputType:
      return {
        ...state,
        showPassword: payload,
      }
    case actions.toggleStatus: {
      return{
        ...state,
        status: payload
      }
    }
    case actions.displayInvoices: {
      return{
        ...state,
        invoicesState: payload
      }
    }
    case actions.reset:
      return {
        initialValues,
      }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
