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
    case actions.changeModalStateToApproveEnrollment: {
      return {
        ...state,
        modalStatusToConfirmEnrollment: action.payload,
      }
    }
    case actions.changeCourse: {
      return {
        ...state,
        courseId: action.payload,
      }
    }
    case actions.changeLevel: {
      return {
        ...state,
        levelId: action.payload,
      }
    }
    case actions.changeEnrollmentId: {
      return {
        ...state,
        enrollmentId: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export { reducer }
