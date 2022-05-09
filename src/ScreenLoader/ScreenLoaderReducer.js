const SCREEN_LOADER = '@SCREEN_LOADER@'
const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SCREEN_LOADER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
