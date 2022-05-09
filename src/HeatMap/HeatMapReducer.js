import getSavedState from 'utils/getSavedState'
const INITIAL_STATE = getSavedState('NYCTAXI.data', {})

export default function heapMAP (state=INITIAL_STATE, action) {
  switch (action.type) {  
    case 'GET_HEATMAPDATA_SUCCESS':
        return action.payload   
    case 'GET_TAXIZONES_SUCCESS':
        return action.payload  
      
    default:
      return state
  }
}
