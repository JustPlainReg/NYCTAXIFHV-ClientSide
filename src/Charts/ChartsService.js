import api from 'utils/api'
class ChartsService {
  async getBarChartData (search) {              
    const data = await api.getBarChartData(
      {body:JSON.stringify(search)})
    return data
  }
}

export default new ChartsService()
