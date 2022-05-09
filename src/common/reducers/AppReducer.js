import {
    GET_HEATMAPDATA_SUCCESS,
    GET_TAXIZONES_SUCCESS,
    GET_DASHBOARD_SUCCESS_Yellow,
    GET_DASHBOARD_SUCCESS_Green,
    GET_DASHBOARD_SUCCESS_Juno,
    GET_DASHBOARD_SUCCESS_Uber,
    GET_DASHBOARD_SUCCESS_Via,
    GET_DASHBOARD_SUCCESS_Lyft,
    UPDATE_SEARCH_ACTION,
    GET_LOCATIONDETAIL_SUCCESS,
    GET_BARCHART_SUCCESS
} from 'common/constants/ActionConstants'
import getSavedState from 'utils/getSavedState'
import heatMAP from 'HeatMap/HeatMapReducer'
import dashBoard from 'DashBoard/DashBoardReducer'
import locationDetail from 'LocationDetail/LocationDetailReducer'
import charts from 'Charts/ChartsReducer'
const INITIAL_STATE = getSavedState('NYCTAXI', {})

export default function NYCTAXI(state=INITIAL_STATE , action) {
  switch (action.type) {
    case GET_HEATMAPDATA_SUCCESS:
      return {
        ...state,
        data: heatMAP(state.data, action)
      }    
      case GET_TAXIZONES_SUCCESS:
      return {
        ...state,
        zones: dashBoard(state.zones, action)
      }    
      case GET_DASHBOARD_SUCCESS_Yellow:
      return {
        ...state,
        dashboardYellow: dashBoard(state.dashboardYellow, action)
      }    
      case GET_DASHBOARD_SUCCESS_Green:
      return {
        ...state,
        dashboardGreen: dashBoard(state.dashboardGreen, action)
      }
      case GET_DASHBOARD_SUCCESS_Juno:
      return {
        ...state,
        dashboardJuno: dashBoard(state.dashboardJuno, action)
      }
      case GET_DASHBOARD_SUCCESS_Uber:
      return {
        ...state,
        dashboardUber: dashBoard(state.dashboardUber, action)
      }
      case GET_DASHBOARD_SUCCESS_Via:
      return {
        ...state,
        dashboardVia: dashBoard(state.dashboardVia, action)
      }
      case GET_DASHBOARD_SUCCESS_Lyft:
      return {
        ...state,
        dashboardLyft: dashBoard(state.dashboardLyft, action)
      }
      case UPDATE_SEARCH_ACTION:
      return {
        ...state,
        search:dashBoard(state.search,action)
      } 
      case GET_LOCATIONDETAIL_SUCCESS:
      return {
        ...state,
        locationDetail:locationDetail(state.locationDetail,action)
      }    
      case GET_BARCHART_SUCCESS:
      return {
        ...state,
        BarChartData:charts(state.BarChartData,action)
      }    

    default:
      return state
  }
}
