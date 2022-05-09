import circularJson from 'circular-json'
import queryParams from 'utils/queryParams'

const params = queryParams(window.location.search)

export default (state) => {
  sessionStorage.setItem(`EPPS-TMP-STATE`, circularJson.stringify(state))
}

export const saveApplicationObj = (applicationObj) => {
  sessionStorage.setItem(`EM_LA_LOAN_DATA`, circularJson.stringify(applicationObj))
}
