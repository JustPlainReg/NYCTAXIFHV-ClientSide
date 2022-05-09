import { connect } from 'react-redux'
import AuthenticationView from 'Authentication/AuthenticationView'
import { bindActionCreators } from 'redux'
import { loadAuthentication,setEPPSUserMapping } from 'Authentication/AuthenticationActions'


const mapDispatchToProps = (dispatch) => {
  return {           
        setEPPSUserMapping:bindActionCreators(setEPPSUserMapping,dispatch)
  }
}
const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationView)
 