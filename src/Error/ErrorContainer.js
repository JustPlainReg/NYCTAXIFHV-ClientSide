import { connect } from 'react-redux'
import QualifyView from 'Error/ErrorView'
const SCREEN_LOADER = '@SCREEN_LOADER@'
const mapDispatchToProps = (dispatch) => {
  return {  
    hideLoader:()=>  dispatch({
      type: SCREEN_LOADER,
      payload: { show: false }
    })
  }
}
const mapStateToProps = (state, meta) => {
  return { }
}
export default connect(mapStateToProps,mapDispatchToProps)(QualifyView)
