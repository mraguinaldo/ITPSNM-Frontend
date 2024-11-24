import { actions } from './actions'

const reducer = (state: any, action: any) => {
  const { payload } = action
  switch (action.type) {
    case actions.chooseStudent: {
      return{
        ...state,
        enrollmentNumber: payload
      }
    }
    case actions.choosePayment: {
      return{
        ...state,
        paymentId: payload
      }
    }
    case actions.changePaymentType: {
      return{
        ...state,
        currentPaymentType: payload
      }
    }
    case actions.toggleInvoice: {
      return{
        ...state,
        invoiceId: payload
      }
    }
    case actions.showStudentOptionsModal: {
      return{
        ...state,
        showModal: payload
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
