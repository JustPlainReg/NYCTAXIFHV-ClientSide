import {GET_BARCHART_SUCCESS,GET_TAXIZONES_SUCCESS} from 'common/constants/ActionConstants'
import createAction from 'utils/createAction'
import Service from 'Charts/ChartsService'
const getSuccessAction = createAction(GET_BARCHART_SUCCESS)
const getTaxiZoneSuccess = createAction(GET_TAXIZONES_SUCCESS)
import { get } from 'lodash'
import { browserHistory } from 'react-router'
import Common from '../common/services/Common';
const SCREEN_LOADER = '@SCREEN_LOADER@'

export const getBarChartData = (search) => {
  return async (dispatch,getState) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Getting Trip Data for Charts' }
    })
    try {          
     
      let results = await Service.getBarChartData(search);    
      let zones= await Common.getZones();   
      dispatch(getSuccessAction(results))    
      dispatch(getTaxiZoneSuccess(zones))    
    
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




