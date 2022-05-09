import getSavedState from 'utils/getSavedState'
const INITIAL_STATE = getSavedState('NYCTAXI', {})

export default function dashBoard (state=INITIAL_STATE, action) {
  switch (action.type) {  
    case 'GET_DASHBOARD_SUCCESS_Yellow':
    case 'GET_DASHBOARD_SUCCESS_Green':
    //case 'GET_DASHBOARD_SUCCESS_Juno':
    case 'GET_DASHBOARD_SUCCESS_Uber':
    case 'GET_DASHBOARD_SUCCESS_Via':
    case 'GET_DASHBOARD_SUCCESS_Lyft':
    case 'UPDATE_SEARCH_ACTION':
    case 'GET_TAXIZONES_SUCCESS':
        return action.payload    
      
    default:
      return state
  }
}
