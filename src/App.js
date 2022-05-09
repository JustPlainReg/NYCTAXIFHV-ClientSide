import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import PropTypes from 'prop-types'
import ScreenLoader from 'ScreenLoader/ScreenLoaderContainer'
const SCREEN_LOADER = '@SCREEN_LOADER@'

let timer=undefined
class App extends React.Component {  
  constructor(props)
  {
    super(props)   
   
  }
  
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
  }
 

  render () {  
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={this.props.routes} />
          <ReduxToastr
            timeOut={4000}
            preventDuplicates
            position='top-center'
            transitionIn='bounceInDown'
            transitionOut='bounceOutUp'
            progressBar />
          <ScreenLoader />
        </div>
      </Provider>
    )
  }
}

export default App
