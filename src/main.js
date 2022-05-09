import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'common/components/themes/vanilla/styles/base.scss'

  import(/* webpackMode: "eager" */ './store').then(s => {
    const createStore = s.default

    // Store Initialization
    // ------------------------------------
    const store = createStore(window.__INITIAL_STATE__)

    // Render Setup
    // ------------------------------------
    const MOUNT_NODE = document.getElementById('root')

    let render = () => {
      const App = require('App').default
      const routes = require('routes').default('',store)

      ReactDOM.render(
        <App store={store} routes={routes} />,
        MOUNT_NODE
      )
    }

    // Development Tools
    // ------------------------------------
    if (__DEV__) {
      if (module.hot) {
        const renderApp = render
        const renderError = (error) => {
          const RedBox = require('redbox-react').default

          ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
        }

        render = () => {
          try {
            renderApp()
          } catch (e) {
            console.error(e)
            renderError(e)
          }
        }

        // Setup hot module replacement
        module.hot.accept([
          './App',
          './routes',
        ], () =>
            setImmediate(() => {
              ReactDOM.unmountComponentAtNode(MOUNT_NODE)
              render()
            })
        )
      }
    }

    // Let's Go!
    // ------------------------------------
    if (!__TEST__) render()
  })

