import React from 'react'
import PropTypes from 'prop-types'
const indexRoute = ({ children }) => (
  <div className='em-cc-bp'>
   { children }
  </div>
)
const dashboard = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const DashBoard = require('DashBoard/DashBoardContainer').default
      cb(null, DashBoard)
    }, 'heatmap-bp')
  }
})
const locationDetail = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const LocationDetail = require('LocationDetail/LocationDetailContainer').default
      cb(null, LocationDetail)
    }, 'heatmap-bp')
  }
})
const heatmap = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const HeatMap = require('HeatMap/HeatMapContainer').default
      cb(null, HeatMap)
    }, 'heatmap-bp')
  }
})
const charts = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Charts = require('Charts/ChartsContainer').default
      cb(null, Charts)
    }, 'charts-bp')
  }
})


const error = (store) => ({
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Error = require('Error/ErrorContainer').default
      cb(null, Error)
    }, 'error-bp')
  }
})

export default (pathPrefix = '', store) => ([  
 
  {
    path        : '/',
    component   : indexRoute,
    indexRoute  : dashboard,
    childRoutes : []
  },
  {
    path        : '/LocationDetail',
    component   : indexRoute,
    indexRoute  : locationDetail,
    childRoutes : []
  },
  {
    path        : '/heatmap',
    component   : indexRoute,
    indexRoute  : heatmap,
    childRoutes : []
  },
  {
    path        : '/charts',
    component   : indexRoute,
    indexRoute  : charts,
    childRoutes : []
  },
 {
  path        : '/error/',
  component   : indexRoute,
  indexRoute  : error,
  childRoutes : []
}
].map((r) => {
  r.path = `${pathPrefix}${r.path}`
  if (!r._storeSet) {
    r.indexRoute = r.indexRoute(store)
  }
  r._storeSet = true
  return r
}))

indexRoute.propTypes = {
  children: PropTypes.object,
}
