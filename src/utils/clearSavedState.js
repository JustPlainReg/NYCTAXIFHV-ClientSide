import queryParams from 'utils/queryParams'

const params = queryParams(window.location.search)

let hasClearedState = false

export const clearStateAndHasClearedState = () => {
  hasClearedState = false
  sessionStorage.clear()
}

export const getHasClearedState = () => {
  return hasClearedState
}

export default () => {
  // CLEAR THE STORAGE IF USER IS COMING FROM AN EXTERNAL SOURCE
  /*const parentLoadTime = window.parent.performance.timing.fetchStart
  const savedParentLoadTime = parseInt(sessionStorage.getItem('parentLoadTime'))
  const TYPE_RELOAD = 1
  if (
    // For local usage (not inside an iframe)
    window.parent !== window &&
    // When the parent initially loaded (TYPE_NAVIGATE || TYPE_BACK_FORWARD)
    parentLoadTime !== savedParentLoadTime &&
    window.parent.performance.navigation.type !== TYPE_RELOAD &&
    // !params.action &&
    !params.id
  ) {
    sessionStorage.clear()
    sessionStorage.setItem('parentLoadTime', parentLoadTime)
    hasClearedState = true
  }*/
}
