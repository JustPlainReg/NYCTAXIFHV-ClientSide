const _getSiteId = (params) => {
  params.site_id = params.site_id || params.siteid || params.siteId || ''
  params.siteid = params.site_id
  return params
}

export default (search) => {
  const params = search
    .replace(/^\?/, '')
    .split('&')
    .map(v => {
      let param = {}
      param[v.split('=')[0]] = v.split('=')[1]
      return param
    })
    .reduce((a, b) => Object.assign(a, b), {})

  return params
}

export const constructQueryString = (queryParams) => {
  const queryString = []
  for (const key in queryParams) {
    const param = `${key}=${queryParams[key]}`
    queryString.push(param)
  }
  return queryString.join('&')
}
