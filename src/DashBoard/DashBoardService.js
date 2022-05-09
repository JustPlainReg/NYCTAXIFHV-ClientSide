import api from 'utils/api'
import {UPDATE_SEARCH_ACTION} from 'common/constants/ActionConstants'
import createAction from 'utils/createAction'
const updateSearchAction = createAction(UPDATE_SEARCH_ACTION)

class DashBoardService {
  async getDashBoardData (seacrhObj,taxiType,dispatch) {
   const search={"locationtype":seacrhObj && seacrhObj.locationType?seacrhObj.locationType:'Pickup',
                "taxitype":taxiType,
                 "month":seacrhObj && seacrhObj.month?seacrhObj.month:0,
                 "countBy":seacrhObj && seacrhObj.countBy?seacrhObj.countBy:'trips'
                 }
    dispatch(updateSearchAction(search))            
    const data = await api.getDashBoardData(
      {body:JSON.stringify(search)})
    return data
  }
  async updateLocation (locationId,Lat,Lng) {   
     await api.updateLocation(locationId,Lat,Lng)  
  }
  async getTaxiZones () {

    const data = await api.getTaxiZones()
    return data
  }
 }

export default new DashBoardService()
