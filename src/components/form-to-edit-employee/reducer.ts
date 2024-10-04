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
    case actions.changeGender:
      return {
        ...state,
        genderId: payload,
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
    case actions.displaySignupModal: {
      return {
        ...state,
        signupFormStatus: action.payload,
      }
    }
    case actions.toggleEmail: {
      return {
        ...state,
        currentEmail: action.payload,
      }
    }
    case actions.reset: {
      return {
        initialValues,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
