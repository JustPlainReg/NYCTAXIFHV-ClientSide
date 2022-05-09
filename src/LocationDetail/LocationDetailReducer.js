import getSavedState from 'utils/getSavedState'
const INITIAL_STATE = getSavedState('NYCTAXI.LocationDetail', {})

export default function locationDetail (state=INITIAL_STATE, action) {
  switch (action.type) {  
    case 'GET_LOCATIONDETAIL_SUCCESS':
        return action.payload   
         
    default:
      return state
  }
}
