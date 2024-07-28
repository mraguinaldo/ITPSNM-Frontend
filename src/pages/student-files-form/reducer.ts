import { actions } from './actions'

const reducer = (state: any, action: any) => {
  const { payload } = action

  switch (action.type) {
    case actions.handleChangeImage: {
      return {
        ...state,
        image: payload,
      }
    }
    case actions.handleChangeCertificate: {
      return {
        ...state,
        certificate: payload,
      }
    }
    case actions.handleChangeIdentityCard: {
      return {
        ...state,
        identityCard: payload,
      }
    }
    case actions.handleChangeReceiptOfPayment: {
      return {
        ...state,
        receiptOfPayment: payload,
      }
    }
    case actions.handleChangeVaccineCard: {
      return {
        ...state,
        vaccineCard: payload,
      }
    }
    case actions.handleChangeMedicalCertificate: {
      return {
        ...state,
        medicalCertificate: payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
