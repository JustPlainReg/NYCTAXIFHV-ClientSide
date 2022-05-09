import createFetch from 'utils/createFetch'
import { apiResponseHandler } from 'utils/apiResponseFilter'
import { API_PROTO_AND_DOMAIN,GOOGLE_MAP_API,GOOGLE_MAP_API_KEY} from 'common/constants/AppGlobals'
import { create } from 'domain';
const defaultBase = API_PROTO_AND_DOMAIN
const googleApiUrl=GOOGLE_MAP_API

export default {
  getTripData: (opts) => createFetch(
    defaultBase + '/API/TripData',
    opts,
    {},
    {
      method: 'POST'
    },
    [apiResponseHandler], true ),
  getTaxiZones: () => createFetch(
    defaultBase + '/API/lookup/GetZones',
    {},
    {},
    {
      method: 'GET'
    },
    [apiResponseHandler], true ),
  getDashBoardData: (opts) => createFetch(
    defaultBase + '/API/TripData/GetDashBoardData',
    opts,
    {},
    {
      method: 'POST'
    },
    [apiResponseHandler], true),
    getBarChartData: (opts) => createFetch(
      defaultBase +  '/API/TripData/GetBarChartData',
      opts,
      {},
      {
        method: 'POST'
      },
      [apiResponseHandler], true),
  updateLocation:(locationId,Lat,Lng)=>createFetch(
    defaultBase + '/API/lookup/UpdateLocation?locationId='+locationId+'&Lat='+Lat+'&Lng='+Lng,
    {},
    {},
    {
      method: 'POST'
    },
    [apiResponseHandler], true,false),
  getLocation:(address)=>createFetch(
    googleApiUrl + '?address='+address+'&key='+GOOGLE_MAP_API_KEY,
    {},
    {},
    {
      method: 'GET'
    },
    [apiResponseHandler], true,true
  ),
  getLocationInfo:(locationId)=>createFetch(
    defaultBase + '/API/Lookup/GetLocation?locationId='+locationId,
    {},
    {},
    {
      method: 'GET'
    },
    [apiResponseHandler], true,false
  ),
  getLocationDetail:(opts)=>createFetch(
    defaultBase + '/API/TripData/GetLocationDetail',
    opts,
    {},
    {
      method: 'POST'
    },
    [apiResponseHandler], true,false
  )
}
