import React from 'react'
import PropTypes from 'prop-types'
class AuthenticationView extends React.Component {
 constructor (props) {
    super(props) 
    this.state={
      username:undefined,
      password:undefined
    }
    this.handleInputChange = this.handleInputChange.bind(this);
   }
  componentDidMount () {      
  }

  handleClick(event){
    var payload={
 "email":this.state.username,
 "password":this.state.password
}
this.props.setEPPSUserMapping(this.state.username,this.state.password)
  }

  handleInputChange(event) {
    const target = event.target;
      const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  } 
  render () {
      return (        
        <div className='login-container'>      
        <div className='log-in-form'>  
        <div className='column row'>
          <lable>EPPS User Name</lable>
          <input type="text" name='username' value={this.state.username} onChange = {this.handleInputChange}/>
        </div>
        <div className='column row'>
          <lable>EPPS Password</lable>
          <input type="password" name='password' value={this.state.password} onChange = {this.handleInputChange}/>
        </div>
        <div className='column row'>
             <input type="button" className="button expanded" value="Create Mapping" onClick={(event) => this.handleClick(event)}/>
             </div>
         </div>
      </div>)
  }
}
AuthenticationView.propTypes = {
  setEPPSUserMapping:PropTypes.func
}
export default AuthenticationView
