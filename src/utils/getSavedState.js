import circularJson from 'circular-json'
import queryParams from 'utils/queryParams'
import clearSavedState from 'utils/clearSavedState'
import { get } from 'lodash'

const params = queryParams(window.location.search)

clearSavedState()

const savedStateStr = sessionStorage.getItem(`EPPS-TMP-STATE`)
let savedState = {}

// Note: This is an override param for development.
// ?clearSavedState=true and your saved redux state
// will be cleared.
if (savedStateStr && !params.clearSavedState) {
  savedState = circularJson.parse(savedStateStr)

  // TODO: these deletes / false values should be set in the reducers
  // thru a LOAD action
  if (savedState.manager) {
    savedState.manager.loaded = false
    savedState.manager.resumeState = false
    savedState.manager.isFormDirty = false
    if (savedState.manager.theme) {
      savedState.manager.theme.loaded = false
    }
    if (savedState.manager.session) {
      savedState.manager.session.isActive = false
    }
    delete savedState.manager.appInfo
  }
}
sessionStorage.removeItem(`EPPS-TMP-STATE`)

export default (slicePath, defaultValue = {}) =>
  (savedState && get(savedState, slicePath)) ? get(savedState, slicePath) : defaultValue
