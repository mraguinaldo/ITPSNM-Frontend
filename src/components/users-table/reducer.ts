import { actions } from './actions'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.displaySignupModal: {
      return {
        ...state,
        signupFormStatus: action.payload,
      }
    }
    case actions.modifyRole: {
      return {
        ...state,
        currentRole: action.payload,
      }
    }
    case actions.toggleEmail: {
      return {
        ...state,
        currentEmail: action.payload,
      }
    }
    case actions.toggleModalState: {
      return {
        ...state,
        modalState: action.payload,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export { reducer }
