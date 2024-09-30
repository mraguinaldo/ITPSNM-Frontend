import { actions } from './actions'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.changeModalState: {
      return {
        ...state,
        isModalOpen: action.payload,
      }
    }
    case actions.changeSearchType: {
      return {
        ...state,
        currentSearchType: action.payload,
      }
    }
    case actions.toggleSearchMode: {
      return {
        ...state,
        selectedSearchMode: action.payload,
      }
    }
    case actions.toggleSearchValue: {
      return {
        ...state,
        searchValue: action.payload,
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
