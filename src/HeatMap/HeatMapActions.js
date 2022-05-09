import {GET_HEATMAPDATA_SUCCESS,GET_TAXIZONES_SUCCESS} from 'common/constants/ActionConstants'
import createAction from 'utils/createAction'
import Service from 'HeatMap/HeatMapService'
const getNotificationSuccessAction = createAction(GET_HEATMAPDATA_SUCCESS)
const getTaxiZoneSuccess = createAction(GET_TAXIZONES_SUCCESS)
import { browserHistory } from 'react-router'
const SCREEN_LOADER = '@SCREEN_LOADER@'

export const getHeatMapData = (locationId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Getting Trip Data' }
    })
    try {    
      
      let results = await Service.getTripData(locationId);       
      dispatch(getNotificationSuccessAction(results))
    
    } catch (e) {
      browserHistory.push('/error/')      
    } finally {
      dispatch({
        type: SCREEN_LOADER,
        payload: { show: false }
      })
    }
  }
}
export const getTaxiZones = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Getting Taxi Zones' }
    })
    try {    
      
      let results = await Service.getTaxiZones();       
      dispatch(getTaxiZoneSuccess(results))
    
    } catch (e) {
      browserHistory.push('/error/')      
    } finally {
      dispatch({
        type: SCREEN_LOADER,
        payload: { show: false }
      })
    }
  }
}




