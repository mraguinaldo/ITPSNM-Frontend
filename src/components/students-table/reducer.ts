import { actions } from './action'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.changeSelectedStudent: {
      return {
        ...state,
        selectedStudent: action.payload,
      }
    }
    case actions.toggleStudentStatus: {
      return {
        ...state,
        studentStatus: action.payload,
      }
    }
    case actions.toggleLockModalState: {
      return {
        ...state,
        modalStateForBlocking: action.payload,
      }
    } case actions.changeModalStateToChangeLevel: {
      return {
        ...state,
        modalStateToChangeLevel: action.payload,
      }
    }
    case actions.toggleEnrollmentNumber: {
      return {
        ...state,
        enrollmentNumber: action.payload,
      }
    }
    case actions.changeLevelId: {
      return {
        ...state,
        currentLevelId: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export { reducer }
