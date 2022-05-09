import { connect } from 'react-redux'
import { get } from 'lodash'
import View from 'Charts/ChartsView'
import { bindActionCreators } from 'redux'
import { getBarChartData} from 'Charts/ChartsActions'
import { getTaxiZones} from 'DashBoard/DashBoardActions'

const mapDispatchToProps = (dispatch) => {
    return {   
      getBarChartData: bindActionCreators(getBarChartData, dispatch)
            
  }
}
const mapStateToProps = (state, meta) => {
  return {
    BarChartData: [get(state, 'NYCTAXI.BarChartData')],
    zones: [get(state, 'NYCTAXI.zones')]  
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(View)
