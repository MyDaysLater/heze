import requestModel from './request'
const api = {
  cardState: (data = {}) => requestModel.createApi('/data/queryCardInfo', 'POST', data),
  download: (data = {}) => requestModel.createApi('/data/dataExport', 'POST', data)
}
export default api
