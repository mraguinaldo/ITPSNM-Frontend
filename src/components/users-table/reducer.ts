import { actions } from './actions'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.changeSelectedUser: {
      return {
        ...state,
        selectedUser: action.payload,
      }
    }
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
    case actions.toggleUserEmail: {
      return {
        ...state,
        userEmail: action.payload,
      }
    }
    case actions.toggleModalState: {
      return {
        ...state,
        modalState: action.payload,
      }
    }
    case actions.toggleLockModalState: {
      return {
        ...state,
        modalStateForBlocking: action.payload,
      }
    }
    case actions.changeModalStateToChangePassword: {
      return { ...state, modalStateToChangePassword: action.payload }
    }
    case actions.toggleUserState: {
      return {
        ...state, userState: action.payload
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
