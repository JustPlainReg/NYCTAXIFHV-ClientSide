import React from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
const tab= {
    overflow: 'hidden',
    border: '1px solid #ccc',
    backgroundColor: '#2080cd'
};
/* Style the buttons inside the tab */
const tabLinks={
    backgroundColor: 'inherit',
    float: 'left',
    border: 'none',
    outline: 'none',
    padding: '14px 30px',
    fontSize: 'inherit',
    color:'#FFFFFF' 
  
};
const showResults= () =>{
    browserHistory.push("/")
}

const showSearchProductPricingForm = () =>{
    browserHistory.push("/search/")
}
const BreadCrumView = ({currentPage}) => {
    return (      
        <div style={tab}>         
        </div>
    )
  }

  BreadCrumView.propTypes = {  
  currentPage:PropTypes.object
}
export default BreadCrumView
