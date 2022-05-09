import { connect } from 'react-redux'
import { get } from 'lodash'
import View from 'LocationDetail/LocationDetailView'
import { bindActionCreators } from 'redux'
import { getLocationDetail} from 'LocationDetail/LocationDetailAction'

const mapDispatchToProps = (dispatch) => {
    return {   
        getLocationDetail: bindActionCreators(getLocationDetail, dispatch)      
  }
}
const mapStateToProps = (state, meta) => {
  return {
    data: [get(state, 'NYCTAXI.locationDetail')],
    search: [get(state, 'NYCTAXI.search')]    
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(View)
