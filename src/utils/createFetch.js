import 'isomorphic-fetch'

import AuthService from 'common/services/AuthService'
import { API_PROTO_AND_DOMAIN } from 'common/constants/AppGlobals'

const defaultBase = API_PROTO_AND_DOMAIN


const defaultOpts = {
  tokenType: 'Basic',
  token: true,
  external: false
}

const tokenize = (url, tokens) => {
  Object
    .keys(tokens)
    .forEach((k) => (url = url.replace(`:${k}`, tokens[k])))
  return url
}

const buildHeaders = async (opts, defaults,isGoogle) => {
 
 if (isGoogle)
 return {  headers: {}}
else
  return {
    headers: {
     // 'accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

const isInvalidToken = (result) => {
  if (result.status === 401) {
    return true
  }
  return false
}

export default async (url, opts = defaultOpts, tokens = {}, defaults = {}, responseFilters = [], ignore401 = false,isGoogle = false) => {
  let requestHeaders = {}
  let optsMerged = {}
  let urlTokenized = tokenize(url, (tokens))

  if (!opts.external) {
    requestHeaders = await buildHeaders(opts, defaults,isGoogle)   
  }
  optsMerged = Object.assign(defaults, opts, requestHeaders)

  let result = await fetch(urlTokenized, optsMerged)
  if (isInvalidToken(result) && !ignore401) {
    if (!opts.external) {
      AuthService.clearToken()
      requestHeaders = await buildHeaders(opts, defaults)
    }
    optsMerged = Object.assign(defaults, opts, requestHeaders)
    result = await fetch(urlTokenized, optsMerged)
  }
  // AnalyticsService.httpResponse(result)
  // passing fetch response through the chain of filters
  return responseFilters.reduce((prevResult, filter) => filter(prevResult), result)
}
