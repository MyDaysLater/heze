import requestModel from './request'
const api = {
  clientList: (data = {}) => requestModel.createApi('/terminal/selectHomeTerminal', 'POST', data),
  innerData: (data = {}) => requestModel.createApi('/terminal/queryClientError', 'POST', data)
}
export default api
