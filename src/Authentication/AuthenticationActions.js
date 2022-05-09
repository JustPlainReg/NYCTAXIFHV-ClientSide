import AuthenticationService from 'Authentication/AuthenticationService'
import { browserHistory } from 'react-router'
const SCREEN_LOADER = '@SCREEN_LOADER@'

export const setEPPSUserMapping = (username, password) => {
   return async (dispatch) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Establishing User Mapping' }
    })
    try {
      const mapping = await AuthenticationService.setUserEPPSMapping ( username, password)
      if(mapping)
      {
        alert("Error occured, Please contact administrator")
      }
      else
      browserHistory.push('/')
        } catch (e) {
      browserHistory.push('/error/') 
      }    finally {
      dispatch({
        type: SCREEN_LOADER,
        payload: { show: false }
      })
    }
   }
}
