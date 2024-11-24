import { actions } from "./actions";


const reducer = (state: any, action: any) => {
  switch(action.type){
    case actions.changeCurrentTransactionType:{
      return{
        ...state,
        currentTransactionType: action.payload
      }
    }
    case actions.changeSearchType: {
      return{
        ...state,
        searchType: action.payload
      }
    }
    case actions.toggleEnrollmentId:{
      return {
        ...state,
        enrollmentId: action.payload
      }
    }
    default: {
      return{...state, }
    }
  }
}

export { reducer }