import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { isNullOrUndefined } from 'util';
import { withGoogleMap, GoogleMap,Circle } from 'react-google-maps';
import Common from '../common/services/Common';
import { browserHistory } from 'react-router'
import Select from 'react-select';

let tripsYellow,tripsGreen, tripsJuno, tripsUber, tripsVia, tripsLyft;
let currentMonth,currentLocationType,currentMapBy;
var Months,LocationTypes;

class DashBoardView extends React.Component {

  constructor (props) {
    super(props)    
   this.handleInputChange = this.handleInputChange.bind(this);
   this.handleInputChangeLocationType = this.handleInputChangeLocationType.bind(this);  
   this.ChangeMapBy = this.ChangeMapBy.bind(this);  
   //this.showLocation=this.showLocation.bind(this);
   
  }
  componentDidMount () {  
    this.props.getDashBoardData()   
    
  }
  showLocation(locationId,taxitype)
  {
    browserHistory.push("/LocationDetail/?locationid="+locationId+"&taxitype="+taxitype)
  }
  handleInputChange(event)
  {
    const target = event.target;
      const value = target.value;      
      currentMonth=value;
      this.props.getDashBoardData({month:value,locationType:this.getSelectedLocationType(),countBy:this.getSelectedMapBy()})  
  }
  ChangeMapBy(event)
  {
    const target = event.target;
      const value = target.value;      
     this.setState({ mapBy:value});    
     this.props.getDashBoardData({month:this.getSelectedMonth(),locationType:this.getSelectedLocationType(),countBy:value})       
  }

  handleInputChangeLocationType(event)
  {
    const target = event.target;
      const value = target.value;     
      this.props.getDashBoardData({month:this.getSelectedMonth(),locationType:value,countBy:this.getSelectedMapBy()})  
  }
getSelectedMonth()
{
  return this.getDropdownSelectedValue('months');
}

getSelectedLocationType()
{
  return this.getDropdownSelectedValue('locationTypes');
}

getSelectedMapBy()
{
  return this.getDropdownSelectedValue('mapTypes');
}

getDropdownSelectedValue(id)
{
  var dd = document.getElementById(id);
  if(dd)
  return dd.options[dd.selectedIndex].value;
  else
  return undefined
}

TripDataGrid(trips,taxiType)
{
  if(trips[0]!=undefined)
    {
      var month = document.getElementById('months');
      var monthText="";
      if(month && month.selectedIndex>0)
      monthText ="For Month of "+ month.options[month.selectedIndex].innerHTML;
      var locationTypes = document.getElementById('locationtype');
      var locationTypesText="";
      if(locationTypes)
      locationTypesText = locationTypes.options[locationTypes.selectedIndex].innerHTML;
      return (
        <div className="grid-container full">               
         <table cellPadding='10' cellSpacing='5' className="hover">    
        <thead>
          <tr><th colSpan="5">Top 10 {locationTypesText} locations for {taxiType} Taxis {monthText}</th></tr>
          <tr>
          <th>Location</th>
          <th>Trips Count</th>
          <th>Average Tip Amount %</th>
          <th>Average Total Trip Amount</th>
          <th>Action</th>
            </tr>
          </thead>  
          <tbody>
            {
          trips[0]!=undefined && trips[0].map((r, index) => {
              return (
                <tr>
                  <td>{r.location}</td>
                  <td>{(r.trips).toLocaleString()}</td>
                  <td>{r.tips}</td>
                  <td>${r.triptotal}</td>
                  <td><a onClick={this.showLocation.bind(this,r.locationid,r.taxitype)}>View</a></td>
                </tr>
              )
          })
        }
            </tbody>        
       </table>
       </div>

      );
    }

}

makeCircle(lat,lng,radius,taxitype)
{
  return <Circle
  radius={radius} 
  center={{ lat: lat, lng: lng} } 
  
options={{
  fillColor: taxitype=='yellow'?'#ffff00':'#00FF00',
  fillOpacity: .8,
  strokeColor:  taxitype=='yellow'?'#fff000':'#00FF00',
  strokeOpacity: 0.8,
  strokeWeight: 1,  
  clickable: false,
  editable: false,
  zIndex: 1
}}/>
}

getCircles(trips)
{
  if(!trips)
  return;
  var i=0;
  var mapTypes = document.getElementById('mapTypes');
  var mapBy=this.getSelectedMapBy()
  mapBy=(mapBy==undefined)?"trips":mapBy;
 
  const circles=Object.values(trips).map((c)=>{   
    var data=mapBy=='trips'?c.trips:c.tips;
    var radius=mapBy=='trips'? c.month?data/1000:data/10000:data*50;
    if(!c.lat || !c.lag)
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
                return this.makeCircle(lat,lag,radius,c.taxitype);
              })
              
          }
     })     
    }
    else    
    return this.makeCircle(c.lat,c.lag,radius,c.taxitype);
})
  return circles;
}

  ZonesDropDown(zones)
  {
    if(zones[0]!=undefined)
    {
     
      return (
        <div>
          <div className="grid-x">
				<div className="small-6 cell">
        <label  style={{fontSize:'14px'}}>Select Taxi PickUp Zone: </label> 
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
  MonthsDropDown()
  {
    Months=[
      {"text":"--Select Month--","value":0},
    {"text":"January","value":1},
    {"text":"February","value":2},
    {"text":"March","value":3},
    {"text":"April","value":4},
    {"text":"May","value":5},
    {"text":"June","value":6},
    {"text":"July","value":7},
    {"text":"August","value":8},
    {"text":"September","value":9},
    {"text":"October","value":10},
    {"text":"November","value":11},
    {"text":"December","value":12}
  ]
 
    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label style={{fontSize:'14px'}}>Filter By Month: </label> 
      </div>
      <div className="small-6 cell">
      <select  style={{width:'150px'}} id="months" value={Number(currentMonth?currentMonth:0)} onChange ={this.handleInputChange}>          
        {
          Months.map((r, index) => {
            return (
              <option value={r.value} key={index} >{r.text}</option>
            )
          })
        }
      </select>
      </div>
      </div>      
      </div>
      
    )
  }
  LocationTypeDropDown()
  {
    LocationTypes=[     
    {"text":"Pickup","value":'Pickup'},
    {"text":"Drop Off","value":'DO'}
  ];
    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label style={{fontSize:'14px'}}>Filter By Location Types: </label> 
      </div>
      <div className="small-3 cell">
      <select  style={{width:'80px'}} id="locationtypes" value={currentLocationType?currentLocationType:'Pickup'}  onChange ={this.handleInputChangeLocationType}>          
        {
          LocationTypes.map((r, index) => {
            return (
              <option value={r.value} key={index}>{r.text}</option>
            )
          })
        }
      </select>
      </div>
      </div>
      </div>
      
    )
  }
  mapByDropDown()
  {
    var mapTypes=[     
    {"text":"Trip Counts","value":'trips'},
    {"text":"Tip Amount","value":'tips'},
    {"text":"Average Total Amount","value":'triptotal'}
  ];
    return (
      <div>
        <div className="grid-x">
      <div className="small-2 cell">
      <label style={{fontSize:'14px'}}>Show Map By: </label> 
      </div>
      <div className="small-3 cell">
      <select  style={{width:'120px'}} id="mapTypes" className="dropdown" value={currentMapBy?currentMapBy:'trips'}  onChange ={this.ChangeMapBy}>          
        {
          mapTypes.map((r, index) => {
            return (
              <option value={r.value} key={index}>{r.text}</option>
            )
          })
        }
      </select>
      </div>
      </div>
      </div>
      
    )
  }
  showTitle()
  {
    alert('Clicked');
  }

  render () {
    const search = this.props.search;
   if(search[0])
   {
    currentMonth=search[0].month;
    currentLocationType=search[0].locationType;
    currentMapBy=search[0].countBy;
   } 
    tripsYellow = get(this.props, 'dataYellow') || {}  
    tripsGreen = get(this.props, 'dataGreen') || {}  
    //tripsJuno = get(this.props, 'dataJuno') || {}
    tripsUber = get(this.props, 'dataUber') || {}
    tripsVia = get(this.props, 'dataVia') || {}
    tripsLyft = get(this.props, 'dataLyft') || {}

    if (!tripsYellow[0] && !tripsGreen[0] && /*!tripsJuno[0] &&*/ !tripsUber[0] && !tripsVia[0] && !tripsLyft[0])
       {return(<div/>)}
    if (tripsYellow[0] && tripsYellow[0].length === 0 && tripsGreen[0] && tripsGreen[0].length === 0 && /*tripsJuno[0] && tripsJuno[0].length === 0 
            &&*/ tripsUber[0] && tripsUber[0].length === 0 && tripsVia[0] && tripsVia[0].length === 0 && tripsLyft[0] && tripsLyft[0].length === 0) {
     
      return (
         <div className='em-cc-bp-notifications'>
          <div className='no-notifications'>
            <h3 className='text'>You do not have any trip data at this time.</h3>
          </div>
        </div>
       )
    }
    const GoogleMapYellow = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }       
      >
      {this.getCircles(tripsYellow[0]) }      
      </GoogleMap>));
      const GoogleMapGreen = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
          defaultZoom = { 13 }
        >
        {this.getCircles(tripsGreen[0]) }        
        </GoogleMap>));
/*
    const GoogleMapJuno = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={ { lat: 40.756795, lng: -73.954298 }}
        defaultZoom = { 13 }
        >
          {this.getCircles(tripsJuno[0]) }
        </GoogleMap>));
*/
    const GoogleMapUber = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={ { lat: 40.756795, lng: -73.954298 }}
        defaultZoom = { 13 }
        >
          {this.getCircles(tripsUber[0]) }
        </GoogleMap>));

    const GoogleMapVia = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={ { lat: 40.756795, lng: -73.954298 }}
        defaultZoom = { 13 }
      >
        {this.getCircles(tripsVia[0]) }
      </GoogleMap>));

    const GoogleMapLyft = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={ { lat: 40.756795, lng: -73.954298 }}
        defaultZoom = { 13 }
      >
        {this.getCircles(tripsLyft[0]) }
      </GoogleMap>));

    return (    
     
     
      <div className="grid-container full" style={{padding:'10px'}}> 
          
      {this.LocationTypeDropDown() }
        {this.MonthsDropDown()}
        {this.mapByDropDown()}
       {this.TripDataGrid(tripsYellow,'yellow')}
      
      <GoogleMapYellow
        containerElement={ <div style={{ height: `500px`, width: '700px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />

      <div style={{height:'60px'}}></div>
       {this.TripDataGrid(tripsGreen,'green')}
       
       <GoogleMapGreen
        containerElement={ <div style={{ height: `500px`, width: '700px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />      

      <div style={{height:'60px'}}></div>
       {this.TripDataGrid(tripsUber,'Uber')}
       
       <GoogleMapUber
        containerElement={ <div style={{ height: `500px`, width: '700px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />      

      <div style={{height:'60px'}}></div>
       {this.TripDataGrid(tripsVia,'Via')}
       
       <GoogleMapVia
        containerElement={ <div style={{ height: `500px`, width: '700px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />      

      <div style={{height:'60px'}}></div>
       {this.TripDataGrid(tripsLyft,'Lyft')}
       
       <GoogleMapLyft
        containerElement={ <div style={{ height: `500px`, width: '700px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }  />       
      

      </div>
      /* ^^ INCLUDE ALL RIDESHARE OPTIONS TOO */
    )
  }
}
DashBoardView.propTypes = {
  getDashBoardData: PropTypes.func  
}
export default DashBoardView
