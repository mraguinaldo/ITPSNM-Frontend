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
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
