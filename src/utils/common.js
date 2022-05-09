import { get } from 'lodash'
import circularJson from 'circular-json'
import { default as queryParams } from 'common/utils/queryParams'

const params = queryParams(window.location.search)

const isLoanReadOnly = (loan, widgetProps) => {
  // active by default
  if (!loan || !widgetProps) {
    return false
  }
  // loan is readonly if the status is not active AND editing inactive loans disabled by the admin
  const isActiveStatus = [
    'Active Loan',
    'Loan Originated',
    'Preapproval request approved but not accepted'].indexOf(loan.LoanStatus) > -1
  return (loan.Status === 'error') || (!isActiveStatus && get(widgetProps, 'editInactiveLoans') === false)
}

const formatDate = (dateString, options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}) => {
  if (dateString) {
    let date = new Date(dateString)
    return date.toLocaleDateString('en-US', options)
  } else {
    return false
  }
}

const formatTime = (dateString, options = {
  hour: '2-digit',
  minute: '2-digit'
}) => {
  if (dateString) {
    let date = new Date(dateString)
    return date.toLocaleTimeString('en-US', options)
  } else {
    return false
  }
}

const saveState = (state) => {
  sessionStorage.setItem(`EM-CC-LA-TMP-STATE-${params.siteid}`, circularJson.stringify(state))
}
const currency = (v) => {
  let parsedVal = parseFloat(v)
  return isNaN(parsedVal) ? ''
  : parsedVal.toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace(/\D\d\d$/, '')
}
const ellipsis = (input, limit) => {
  if (!input || !input.length) return
  return (input.length < limit) ? input : `${input.slice(0, limit)}...`
}

const resolveBeaconPayload = (userId, loanId) => {
  return {
    user : {
      id : userId,
      type : 'CONSUMER'
    },
    loan : {
      id: loanId
    }
  }
}

export {
  isLoanReadOnly,
  formatDate,
  formatTime,
  saveState,
  currency,
  ellipsis,
  resolveBeaconPayload
}
