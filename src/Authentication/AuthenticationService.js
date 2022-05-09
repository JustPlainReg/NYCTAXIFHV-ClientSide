import api from 'utils/api'
import {
  JWT_TOKEN 
} from 'common/constants/AppGlobals'

import {
  AuthService 
} from 'common/services/AuthService'
import Common from 'common/services/Common';

class AuthenticationService {
  async setAuthForLAT (token, authCode) {
    const body = { authCode }
    const data = await api.setAuthForLAT(
      { body: JSON.stringify(body) },
      { token })
    return data.json()
  }
  async setAuthForPackage (loanId, authCode) {
    const body = { authCode }
    const data = await api.setAuthForPackage(
      { body: JSON.stringify(body) },
      { loanId })
    return data.json()
  }
  async getAuthentication (token) {
    const data = await api.getAuthentication({}, { token })
    return data.status
  }
   async setUserEPPSMapping (username, password) {
    const body = { 
                 "transactionId": Common.getTransactionId(),
                "eppsUserPassword": password
                  } 
    const data = await api.setUserEPPSMapping(
      {body: JSON.stringify(body)}, username)
    return data
  }
  async setUserEPPSMappingWebhook (username, password) {
    const body = { 
                 "ssoUserId": "me",
                "eppsUserPassword": password
                  } 
    const data = await api.setUserEPPSMapping(
      {body: JSON.stringify(body),
      customToken: { value: JWT_TOKEN },
      tokenType: '' }, username)
    return data
  }

  async refreshJWT (username, token) {  
    const data = await api.refreshJWT(
      {customToken: { value: token },
      tokenType: 'Bearer' }, username)
    return data
  }
  async login (username, password) {
    const body = {"userPassword": password} 
    const data = await api.login(
      {body: JSON.stringify(body)}, username)
    return data
  }


}
export default new AuthenticationService()
