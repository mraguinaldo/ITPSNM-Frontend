import { actions } from './actions'

const reducer = (state: any, action: any) => {
  const { payload } = action

  switch (action.type) {
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
    default:
      return {
        ...state,
      }
  }
}

export { reducer }
