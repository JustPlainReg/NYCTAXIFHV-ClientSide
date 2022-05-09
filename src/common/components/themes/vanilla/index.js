import React from 'react'
import PropTypes from 'prop-types'

import HeaderView from './components/core/HeaderView'

const isActivePath = (sectionName) => {
  const path = window.location.pathname
  return (new RegExp(sectionName + '/$')).test(path) ? 'active' : ''
}

const NavigationView = ({ navigationActions, currentLoan }) => {
  let navigation = []
  navigation.push(<li key='home' className={`home item ${isActivePath('borrower-app')}`}>
    <a tabIndex='0' onClick={navigationActions.gotoHome}>Home</a>
  </li>)

  if (!isActivePath('borrower-app') && currentLoan.Id && currentLoan.Status === 'submitted') {
    const loanNavItems = [
    ]
    if (currentLoan.isConsentInValid === false) {
      const currentLoanNav = [
        <li key='tasks' className={`tasks item ${isActivePath('tasks')}`}>
          <a tabIndex='0' onClick={navigationActions.gotoTasks}>Tasks</a>
        </li>,
        <li key='repository' className={`upload item ${isActivePath('repository')}`}>
          <a tabIndex='0' onClick={navigationActions.gotoRepository}>Uploads</a>
        </li>,
        <li key='summary' className={`summary item ${isActivePath('summary')}`}>
          <a tabIndex='0' onClick={navigationActions.gotoSummary}>Summary</a>
        </li>,
        <li key='notifications' className={`notifications item ${isActivePath('notifications')}`}>
          <a tabIndex='0' onClick={navigationActions.gotoNotifications}>Notifications</a>
        </li>,
      ]
      loanNavItems.push(currentLoanNav)
    }
    navigation = navigation.concat(loanNavItems)
  }

  return (<ul className='navigation'>{navigation}</ul>)
}

const ThemeView = ({ navigationActions, children, widget, currentLoan }) => {
  return (
    <div className='em-cc-bp-theme-vanilla'>
      <HeaderView widget={widget} />
      <div className='navigation-shim' />
      <div className='em-cc-bp-wrapper row'>
        <div className=' em-cc-bp-left-nav'>
          <NavigationView navigationActions={navigationActions} currentLoan={currentLoan} />
        </div>
        <div className='em-cc-bp-content columns small-12'>
          { children }
        </div>
      </div>
    </div>
  )
}

NavigationView.propTypes = {
  navigationActions: PropTypes.object,
  currentLoan: PropTypes.object
}

ThemeView.propTypes = {
  navigationActions: PropTypes.object,
  children: PropTypes.any,
  currentLoan: PropTypes.object,
  widget: PropTypes.object
}

export default ThemeView
