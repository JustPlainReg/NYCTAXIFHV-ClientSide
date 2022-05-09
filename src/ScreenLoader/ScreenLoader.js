const SCREEN_LOADER = '@SCREEN_LOADER@'

const ScreenLoader = (payload) => {
  return {
    type: SCREEN_LOADER,
    payload
  }
}

export default ScreenLoader
