import requestModel from './request'
const api = {
  bankSuport: (data = {}) => requestModel.createApi('/bank/bankSuport', 'POST', data)
}
export default api
