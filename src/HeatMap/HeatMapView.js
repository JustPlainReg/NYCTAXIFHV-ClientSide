import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import loadGoogleMaps from 'utils/loadGoogleMap'

let map, heatmap,zones,trips;
let points,currentLocation
var coords=[];
class HeatMapView extends React.Component {

  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this);
    window.addEventListener('load', this.initialize);
    this.getZoneLatandLong = this.getZoneLatandLong.bind(this);
    
  }
  componentDidMount () {      
    this.props.getTaxiZones()   
    this.props.getHeatMapData()
  
  }
setupMap=()=>{
    setTimeout(() => loadGoogleMaps(this.initMap))
  }
  initMap=()=> {
   alert('map loaded');
   zones[0].forEach((z)=>{
   
 //setTimeout(() => {
  this.getZoneLatandLong(z)
 //}, 1000);
//console.log(coords);
   });
};
  getZoneLatandLong(z)
  {
   
     
       
          var address=z.zone+", "+z.borough+", NY"; 
          var self=this;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address': address
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var Lat = results[0].geometry.location.lat();
            var Lng = results[0].geometry.location.lng();
            console.log('update taxi_zones set latitude='+Lat+",longitude="+Lng+' Where locationid='+z.locationid);   
            //coords.push({"locationId":z.locationId,"Lat":Lat,"Lng":Lng}); 
                  
      
          } else {
            //alert("Something got wrong while getting the location co-ordinates" + status);    
          }  
        });
     
    
    //console.log(coords);
  }

loadMap()
{
  //const zones = get(this.props, 'zones')
  let selectedZone=zones[0].filter((z)=>{
    if(z.locationid==(currentLocation==undefined?1:currentLocation))
    {
      return true;
      
    }
  });
  let address=selectedZone[0].zone+", "+selectedZone[0].borough+", NY"; 
  var self=this;
  self.loadScript("https://maps.googleapis.com/maps/api/js?libraries=visualization",function() {  
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var Lat = results[0].geometry.location.lat();
      var Lng = results[0].geometry.location.lng();
      console.log('Lat: '+Lat+" Lang: "+Lng); 
        let greenPointCount=0;
        let yellowPointCount=0;
        trips[0].forEach((t)=>{
          if(t.taxitype=='green')
              greenPointCount+= t.tripcount
          else
              yellowPointCount+= t.tripcount
          });     
        points=self.getPoints(Lat,Lng,(greenPointCount+yellowPointCount));
        const dataPoints=points.map((r) =>{
          return   new google.maps.LatLng(r.latitude, r.longitude);
        });
        var map2 = new google.maps.Map(document.getElementById('map2'), { 
          center: {lat:Lat, lng:Lng},  zoom: 10, mapTypeId: 'terrain' });  
            
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: {lat:Lat, lng:Lng},
          mapTypeId: 'terrain'
        });  
       // map.addListener('zoom_changed', function() {
        //  alert(this.map.getZoom());
       // });
       // map.on('zoomend', function(){
        //  alert(map.getZoom());
       // });
        heatmap = new google.maps.visualization.HeatmapLayer({
      data: dataPoints ,
     map: map2
    });
    heatmap.set('radius', 20);
    heatmap.set('opacity', 0.8);
   
//
    var greenCircle = new google.maps.Circle({
      strokeColor: '#00FF00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#00FF00',
      fillOpacity: 0.35,
      map: map,
      center: {lat:Lat, lng:Lng},
      radius: greenPointCount/100
    });
      
    var yellowCircle = new google.maps.Circle({
      strokeColor: '#FFFF00',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#FFFF00',
      fillOpacity: 0.35,
      map: map,
      center: {lat:Lat, lng:Lng},
      radius: yellowPointCount/100
    });

    } else {
      alert("Something got wrong while getting the location co-ordinates" + status);    
    }  
  });
});
}

  handleInputChange(event)
{
  const target = event.target;
    const value = target.value;
    currentLocation=value;
    this.props.getHeatMapData(value)
    this.loadMap();
    
}

loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

getLocationCordinates(address)
{
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var Lat = results[0].geometry.location.lat();
      var Lng = results[0].geometry.location.lng();
      console.log('Lat: '+Lat+" Lang: "+Lng);
      return {'Lat':Lat,"Lng":Lng}
    } else {
      alert("Something got wrong " + status);
      return{}
    }
  });
}

 initMap2() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.775, lng: -122.434},
    mapTypeId: 'satellite'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: this.getPoints(),
    map: map
  });
}

toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

 getPoints(Lat,Lng,count) {
   var points=[];
   for(var i=1;i<=count;i++)
   {
    points.push({"lat":Lat+(.000001*i),"lng": Lng+(.000001*i)});
   }

    return points;   
  }
TripDataGrid(trips)
{
  if(trips[0]!=undefined)
    {
      return (
        <div className="grid-container full">               
         <table cellPadding='10' cellSpacing='5' className="hover">    
        <thead>
          <tr>
            <th>Trips Count</th><th>Avg Trip Distance</th><th>Avg Fare Amount</th><th>Avg Tip Amount</th><th>Avg Total Amount</th><th>Taxi Type</th>
            </tr>
          </thead>  
          <tbody>
            {
          trips[0]!=undefined && trips[0].map((r, index) => {
              return (
                <tr><td>{r.tripcount}</td><td>{r.tripdistance}</td><td>{r.fareamount}</td><td>{r.tipamount}</td><td>{r.totalamount}</td><td>{r.taxitype=='green'?"green":"yellow"}</td></tr>
              )
          })
        }
            </tbody>        
       </table>
       </div>

      );
    }

}
  ZonesDropDown(zones)
  {
    if(zones[0]!=undefined)
    {
      return (
        <div>
          <div className="grid-x">
				<div className="small-6 cell">
        <label>Select Taxi PickUp Zone: </label> 
        <select  style={{width:'60px;'}}  onChange ={this.handleInputChange}>          
          {
            zones[0]!=undefined && zones[0].map((r, index) => {
              return (
                <option value={r.locationid} key={index}>{r.borough}/{r.service_zone}/{r.zone}</option>
              )
            })
          }
        </select>
        </div>
        </div>
        </div>
        
      )
    }
  }
 
  render () {
    const mapStyle = {width:700, height:500,  border:'1px solid black', margin:'5px' }; 
    trips = get(this.props, 'data') || {}    
    zones = get(this.props, 'zones') || {}  
    if (!trips[0] && !zones[0])
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
    this.setupMap();
    //var func= this.getZoneLatandLong;
   // zones[0].forEach((z)=>{
    //  setTimeout(function() {
    //    func(z);
     // }, 1000);
   
    //})
    return (     
     
      <div className="grid-container full">  
        {this.ZonesDropDown(zones)}
        {this.TripDataGrid(trips)}
        <div id="map" style={mapStyle} >I should be a map!</div>
        <div id="map2" style={mapStyle} >I should be a map!</div>
      </div>
    )
  }
}
HeatMapView.propTypes = {
  getHeatMapData: PropTypes.func,
  getTaxiZones:PropTypes.func
}
export default HeatMapView
