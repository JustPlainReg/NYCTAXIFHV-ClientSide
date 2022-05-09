import getSavedState from 'utils/getSavedState'
const INITIAL_STATE = getSavedState('NYCTAXI.BarChartData', {})

export default function dashBoard (state=INITIAL_STATE, action) {
  switch (action.type) { 
    case 'GET_BARCHART_SUCCESS':
        return action.payload
    default:
      return state
  }
}
