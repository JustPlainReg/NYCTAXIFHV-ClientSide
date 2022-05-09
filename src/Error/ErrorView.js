import React from 'react'
import PropTypes from 'prop-types'

class ErrorView extends React.Component {
    constructor(props)
    {
        super(props)
        this.props.hideLoader();
     
    }
   render()
   { 
      //console.trace();
    return (
      <div className="callout alert">
        <h5>Error!</h5>
        <p>An Error occured, please contact administrator.</p>        
        </div>
      )
    }
}
ErrorView.propTypes = {
    hideLoader: PropTypes.func    
  }
export default ErrorView