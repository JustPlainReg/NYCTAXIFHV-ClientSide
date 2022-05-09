import AppError from 'utils/errors/appError'

const parseValidResponse = async (response, ignoreErrorStatuses = []) => {
  const responseCode = response.status
  if (response.ok || (ignoreErrorStatuses.indexOf(responseCode) >= 0)) {
    const contentType = response.headers.get('content-type')
    let responseBody
    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json()
    } else {
      responseBody = await response.text()
    }
    return responseBody
  } else {
    throw new AppError()
  }
}
/**
 * This will handle api response and return json object if success
 * if anything not between response status 200 - 299 (see response.ok) it will throw AppError exception
 * @param {*} response api response object
 */
export const apiResponseHandler = async (response) => {
  const responseBody = parseValidResponse(response)
  return responseBody
}

export const apiResponseIgnore400ErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [400])
  return responseBody
}
export const apiResponseIgnore401ErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [401])
  return responseBody
}
export const apiUserResponseErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [404, 401, 409])
  return responseBody
}

export const apiResponseIgnore404403ErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [404, 403])
  return responseBody
}

export const apiResponseIgnore400403404ErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [400, 403, 404])
  return responseBody
}

export const apiResponseIgnore400401ErrorHandler = async (response) => {
  const responseBody = await parseValidResponse(response, [400, 401])
  return responseBody
}