import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ScreenLoader = ({ opts }) => {
  if (!opts.show) {
    opts.message=undefined
    return null
  }
  return (
    <div className='em-cc-la screen-loader'>
      <div className='api-loader float-center' />
      <p className='text-center'>{opts.message?opts.message+'...':'Loading...'}</p>
    </div>
  )
}

ScreenLoader.propTypes = {
  opts: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

const mapStateToProps = (state, meta) => {
  return {
    opts: state.screenLoader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenLoader)
