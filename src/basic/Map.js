import React, { Component } from 'react';
import { withGoogleMap, GoogleMap,Circle } from 'react-google-maps';
class Map extends Component {
  render(){
    
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
        defaultZoom = { 13 }
      >
      <Circle
        radius={1200}
        center={{ lat: 40.756795, lng: -73.954298 } }
       options={{
        fillColor: '#ffff00',
        fillOpacity: .5,
        strokeWeight: .5,
        clickable: false,
        editable: false,
        zIndex: 1
      }}
      />
      </GoogleMap>
   ));
    return(
      <div>
      <GoogleMapExample
        containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
      />
    </div>
    );
  }
};
export default Map;