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
    case actions.changeGender:
      return {
        ...state,
        gender: payload,
      }
    case actions.toggleMaritalStatus:
      return {
        ...state,
        maritalStatus: payload,
      }
    case actions.addProvince:
      return {
        ...state,
        province: payload,
      }
    case actions.addCounty:
      return {
        ...state,
        county: payload,
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
    case actions.handleChangeImage: {
      return {
        ...state,
        PHOTO: payload,
      }
    }
    case actions.handleChangeCertificate: {
      return {
        ...state,
        REPORT_CARD: payload,
      }
    }
    case actions.handleChangeIdentityCard: {
      return {
        ...state,
        IDENTITY_CARD: payload,
      }
    }
    case actions.handleStudentEditing: {
      return {
        ...state,
        editStudent: payload,
      }
    }
    case actions.changeModalStatePeriod: {
      return{
        ...state,
        modalStatusToConfirmPeriod: payload
      }
    }
    case actions.toggleCurrentPeriod: {
      return {
        ...state,
        currentPeriod: action.payload,
      }
    }
    case actions.addPaymentId: {
      return {
        ...state,
        currentPaymentId: action.payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
