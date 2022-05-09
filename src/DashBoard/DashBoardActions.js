import {GET_DASHBOARD_SUCCESS_Yellow,GET_DASHBOARD_SUCCESS_Green,GET_DASHBOARD_SUCCESS_Juno,GET_DASHBOARD_SUCCESS_Uber,GET_DASHBOARD_SUCCESS_Via,GET_DASHBOARD_SUCCESS_Lyft,GET_TAXIZONES_SUCCESS} from 'common/constants/ActionConstants'
import createAction from 'utils/createAction'
import Service from 'DashBoard/DashBoardService'
const getSuccessAction_Yellow = createAction(GET_DASHBOARD_SUCCESS_Yellow)
const getSuccessAction_Green = createAction(GET_DASHBOARD_SUCCESS_Green)
const getSuccessAction_Juno = createAction(GET_DASHBOARD_SUCCESS_Juno)
const getSuccessAction_Uber= createAction(GET_DASHBOARD_SUCCESS_Uber)
const getSuccessAction_Via = createAction(GET_DASHBOARD_SUCCESS_Via)
const getSuccessAction_Lyft = createAction(GET_DASHBOARD_SUCCESS_Lyft)
const getTaxiZoneSuccess = createAction(GET_TAXIZONES_SUCCESS)
import { get } from 'lodash'
import { browserHistory } from 'react-router'
const SCREEN_LOADER = '@SCREEN_LOADER@'

export const getDashBoardData = (search) => {
  return async (dispatch,getState) => {
    dispatch({
      type: SCREEN_LOADER,
      payload: { show: true,message:'Getting DashBoard Trip Data' }
    })
    try {    
      
      //if no search criteria is passed try to get it form the store first
      if(!search)
      search=[get(getState(), 'NYCTAXI.search')][0]  
      let results = await Service.getDashBoardData(search,'yellow',dispatch);       
      dispatch(getSuccessAction_Yellow(results))
      results = await Service.getDashBoardData(search,'green',dispatch);       
      dispatch(getSuccessAction_Green(results))
     /* results = await Service.getDashBoardData(search,'Juno',dispatch);       
      dispatch(getSuccessAction_Juno(results))*/
      results = await Service.getDashBoardData(search,'Uber',dispatch);       
      dispatch(getSuccessAction_Uber(results))
      results = await Service.getDashBoardData(search,'Via',dispatch);       
      dispatch(getSuccessAction_Via(results))
      results = await Service.getDashBoardData(search,'Lyft',dispatch);       
      dispatch(getSuccessAction_Lyft(results))
    
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




