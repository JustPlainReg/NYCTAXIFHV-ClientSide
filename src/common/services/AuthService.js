import mainApi from 'utils/api'
import { constructQueryString, default as queryParams } from 'utils/queryParams'
import {
  BASIC_TOKEN,
  AUTH_TOKEN,
  STORAGE_PREFIX,
  TOKEN_KEY,
  PAT_TOKEN_KEY,
  GRANT_AND_SCOPE
} from 'common/constants/AppGlobals'

class AuthService {
  constructor () {
    this.api = { ...mainApi }
    this.params = queryParams(window.location.search)
    this.tokenKey = TOKEN_KEY
    this.PATtokenKey = PAT_TOKEN_KEY
  }

  async isActiveSession () {
   // const token = await this.fetchToken()
    //return !token.guest
  }

  getToken (key = this.tokenKey) {
   
    const token = sessionStorage.getItem(key)
    if (token) {
      return JSON.parse(token)
    }
  }
  getPATToken (key = this.PATtokenKey) {  
    const token = sessionStorage.getItem(key)    
      return token    
  }
  setToken (key, token) {
    sessionStorage.setItem(key, token)
  }
  setPATToken (key, token) {
    sessionStorage.setItem(key, token)
  }

  removeToken (key) {
    sessionStorage.removeItem(key)
  }

  async fetchToken () {
     try {    
      return await this.fetchGuestToken()
    } catch (e) {
      console.error(e)
    }
  }

  setAuthToken (token) {
    this.setToken(this.tokenKey, token)
  }

  clearToken () {
    this.removeToken(this.tokenKey)
  }

  async getMe () {
    try {
      let userData = await mainApi.getMe()
      return userData
    } catch (e) {

    }
  }

  checkToken () {
    return this.getToken(this.tokenKey)
  }

  isGuestToken () {
    const token = this.getToken()
    return token && token.guest
  }

  async fetchGuestToken () {
    try {
      // fetch OAPI guest access token
      let formdata = GRANT_AND_SCOPE
      const tokenData = await mainApi.getOpenAPIToken(
        {
          body: formdata,       
          customToken: { value: BASIC_TOKEN },
          tokenType:''
        })
      const value = tokenData[AUTH_TOKEN]
      const token = JSON.stringify({
        value,
        tokenType:"Bearer"       
      })
      //this.setAuthToken(token)
      return { value: value, guest: true }
    } catch (e) {
      console.error('Failed to get guest token: ', e)
    }
  }
  redirectToLogin (queryParams, _window = window) {
    _window.location.href = `/login/${_window.location.search}&${constructQueryString(queryParams)}`
  }
  redirectOnLogout (queryParams, _window = window) {
    _window.location.href = `/login/` +
      `${_window.location.search}&${constructQueryString(queryParams)}`
  } 
}

export default new AuthService()
