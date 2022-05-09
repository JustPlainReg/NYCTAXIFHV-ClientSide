import {GET_LOCATIONDETAIL_SUCCESS} from 'common/constants/ActionConstants'
import createAction from 'utils/createAction'
import Service from 'LocationDetail/LocationDetailService'
const getLocationDetailSuccessAction = createAction(GET_LOCATIONDETAIL_SUCCESS)
import { browserHistory } from 'react-router'
const SCREEN_LOADER = '@SCREEN_LOADER@'
import { get } from 'lodash'

export const getLocationDetail = (locationid,taxitype) => {
  return async (dispatch, getState) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Getting Location Data' }
    })
    try {    
      //get previous search
      const search = get(getState(),'NYCTAXI.search', {})
      let results = await Service.getLocationDetail({...search,locationid:Number(locationid),taxitype:taxitype});       
      dispatch(getLocationDetailSuccessAction(results))
          
    } catch (e) {
      browserHistory.push('/error/')      
    } 
    finally {
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




