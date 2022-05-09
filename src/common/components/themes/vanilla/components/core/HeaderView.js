import React from 'react'
import PropTypes from 'prop-types'

const HeaderView = ({ widget }) => {
  const headerLogo = widget.headerLogo
  return (
    <div className='em-cc--header'>
      <span>
        <img src={headerLogo} className='em-cc--logo' role='presentation' />
      </span>
      <ul className='em-cc--navigation'>
        <li>
          <a href={`/borrower-app/change-password/${window.location.search}`}>
            <i className='change-password' />Change Password
          </a>
        </li>
        <li>
          <a href={`/borrower-app/logout/${window.location.search}`}>
            <i className='logout' />Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

HeaderView.propTypes = {
  widget: PropTypes.object
}

export default HeaderView
