import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import Common from '../common/services/Common';
import { withGoogleMap, GoogleMap,Marker,InfoWindow } from 'react-google-maps';
import queryParams from 'utils/queryParams'
import Service from 'LocationDetail/LocationDetailService'

var currentLocation="";
var locationId;

class LocationDetail extends React.Component {

  constructor (props) {
    super(props)       
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    
  }
  

  componentDidMount () {      
    const params = queryParams(window.location.search)
    locationid=params.locationid
    const taxitype=params.taxitype
    Service.getLocationinfo(Number(locationid)).then((c)=>{

      currentLocation=c;
      if(currentLocation && currentLocation.latitude && currentLocation.longitude)
      {
          this.props.getLocationDetail(locationid,taxitype)  
      }
    });
  }

  onMarkerClick = (e,index) => {
    this.setState({
      activeindex: index,
      showingInfoWindow: true
    });
  }
TripDataGrid(trips)
{
  if(trips[0]!=undefined)
    {
      const search = this.props.search;
      return (
        <div className="grid-container full">     
        <div className="section-header">Current Location: {currentLocation.borough+'/'+currentLocation.zone+'/'+currentLocation.service_zone}</div>          
         <table cellPadding='10' cellSpacing='5' className="hover">    
        <thead>
          <tr><th colSpan="4">
          <div>Top {trips[0].length} {(search[0].locationtype=='Pickup') && <span> Destinations</span> }
          {(search[0].locationType=='Pickup') && <span> Pickup Locations</span> } By
          {(search[0].countBy=='trips') && <span> Trip Counts</span> }
          {(search[0].countBy=='tips') && <span> Avergae Tip Amount</span> }
          {(search[0].countBy=='triptotal') && <span> Avergae Total Trip Amount</span> }
          {(search[0].month>0) && <span> for month of {Common.getMonths()[search[0].month-1]}</span> }
          </div>

      
          </th></tr>
          <tr>
          <th>Location</th><th>Trips Count</th><th>Avg Tip Amount</th><th>Average Total Trip Amount</th><th>Taxi Type</th>
            </tr>
          </thead>  
          <tbody>
            {
          trips[0]!=undefined && trips[0].map((r, index) => {
              return (
                <tr><td>{r.location}</td><td>{r.trips}</td><td>{r.tips}</td><td>{r.triptotal}</td><td>{r.taxitype=='green'?"green":"yellow"}</td></tr>
              )
          })
        }
            </tbody>        
       </table>
       </div>

      );
    }

}

makeMarker(lat,lng,title,index,currentLocation)
{
  return <Marker key={index}  position={{ lat: lat, lng: lng} }
   onClick = {(e)=> this.onMarkerClick(e,index) }
  >
  {((this.state.showingInfoWindow && this.state.activeindex==index) ||(currentLocation)) &&
  <InfoWindow>
			 <div>{title}</div>
		 </InfoWindow>
  }
     </Marker>
  
}


getMarkers(trips)
{
  if(!trips)
  return;
  
  
    let markers=trips.map((c,index)=>{   
      var data=c.trips;
        if(!c.latitude || !c.longitude)
      {
        var loc=c.location.split('/');  
        let address=loc[1]+" "+ loc[0]+", NY"; 
        Common.getLocation(address).then((data)=>{
        
        if(data && data.results[0] && data.results[0].geometry && data.results[0].geometry.location)
              {
                var lat=data.results[0].geometry.location.latitude
                var lag=data.results[0].geometry.location.longitude
                Common.updateLocation(c.locationid,latitude,longitude).then(()=>{
                  console.log(lat+' : '+lag)                
                  return this.makeMarker(lat,lag,c.location,index);
                })
                
            }
       })     
      }
      else    
      return this.makeMarker(c.latitude,c.longitude,c.location,index);

  })
  //Service.getLocationinfo(Number(locationId)).then((currentLocation)=>{

    if(currentLocation && currentLocation.latitude && currentLocation.longitude)
    {
      markers.push(this.makeMarker(currentLocation.latitude,currentLocation.longitude,"Selected Location",trips.length,1));
      return markers;
    }
    else
    return markers;
  
    
  

}
 
 
  render () {
    const mapStyle = {width:700, height:500,  border:'1px solid black', margin:'5px' }; 
    var trips = get(this.props, 'data') || {}    
     if (!trips[0])
       {return(<div/>)}
    if (trips[0] && trips[0].length === 0) {
      return (
         <div className='em-cc-bp-notifications'>
          <div className='no-notifications'>
            <h3 className='text'>You do not have any trip data at this time.</h3>
          </div>
        </div>
       )
    }
    const GoogleMapLocation = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 11 }>
        
       {this.getMarkers(trips[0]) }     
       
      </GoogleMap>));
    return (     
     
      <div className="grid-container full">  
        {this.TripDataGrid(trips)}        
        <GoogleMapLocation
        containerElement={ <div style={{ height: `500px`, width: '100%' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />
    
      </div>
    )
  }
}
LocationDetail.propTypes = {
  getHeatMapData: PropTypes.func,
  search:PropTypes.object
}
export default LocationDetail
