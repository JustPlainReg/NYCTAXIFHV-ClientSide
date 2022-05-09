import api from 'utils/api'

class Service {
  async getLocationDetail (search) {
    /*const search={"locationType":seacrhObj && seacrhObj.locationType?seacrhObj.locationType:'PU',
    "taxiType":seacrhObj.locationType,
     "month":seacrhObj && seacrhObj.month?seacrhObj.month:0,
     "countBy":seacrhObj && seacrhObj.countBy?seacrhObj.countBy:'trips'
     }*/
        const data = await api.getLocationDetail(
      {body:JSON.stringify(search)}
    )
    return data
  }

  async getLocationinfo(locationid) {
      const data = await api.getLocationInfo(locationid)
    return data
  }
  
}

export default new Service()
