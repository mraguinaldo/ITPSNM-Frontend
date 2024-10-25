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
    case actions.displayPayments: {
      return{
        ...state,
        paymentsState: payload
      }
    }
    case actions.toggleEmployee: {
      return{
        ...state,
        employeeId: payload
      }
    }
    case actions.togglePaymentId: {
      return{
        ...state,
        paymentId: payload
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
