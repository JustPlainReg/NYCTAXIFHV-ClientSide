import { connect } from 'react-redux'
import { get } from 'lodash'
import View from 'HeatMap/HeatMapView'
import { bindActionCreators } from 'redux'
import { getHeatMapData,getTaxiZones} from 'HeatMap/HeatMapActions'

const mapDispatchToProps = (dispatch) => {
    return {   
        getHeatMapData: bindActionCreators(getHeatMapData, dispatch),  
        getTaxiZones:   bindActionCreators(getTaxiZones, dispatch)  
  }
}
const mapStateToProps = (state, meta) => {
  return {
    data: [get(state, 'NYCTAXI.data')],
    zones: [get(state, 'NYCTAXI.zones')]
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(View)
