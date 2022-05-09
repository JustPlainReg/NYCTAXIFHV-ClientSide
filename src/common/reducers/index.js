import { combineReducers } from 'redux'
import { reducer as toastr } from 'react-redux-toastr'
import screenLoader from 'ScreenLoader/ScreenLoaderReducer'
import NYCTAXI from 'common/reducers/AppReducer'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    screenLoader,
    toastr,  
    NYCTAXI,
    ...asyncReducers
    
  })
}

export default makeRootReducer