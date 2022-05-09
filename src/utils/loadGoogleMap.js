//import { GOOGLE_MAPS_API_KEY } from '../constants/AppGlobals'

const loadGoogleMaps = (initAddress) => {
  if (window.google && window.google.maps) {
    initAddress()
  } else if (document.querySelector('#google-maps')) {
    setTimeout(() => loadGoogleMaps(initAddress), 200)
  } else {
    window.initAddress = initAddress
    const attributes = {
      type: 'text/javascript',
      url: `https://maps.googleapis.com/maps/api/js?libraries=[places,visualization]&key=AIzaSyApQ6XMvTBUdpjeirPg0OOBQ8byEu2Sf6c&callback=initMap`
    }
    const script = document.createElement('script')
    document.querySelector('body').appendChild(script)
    script.setAttribute('src', attributes.url)
    script.setAttribute('type', attributes.type)
    script.setAttribute('id', 'google-maps')
  }
}

export default loadGoogleMaps