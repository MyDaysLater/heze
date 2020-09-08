import requestModel from './request'
const api = {
  bankClassifyList: (data = {}) => requestModel.createApi('/bank/queryBankeInfo', 'POST', data),
  addBank: (data = {}) => requestModel.createApi('/bank/insertBankeInfo', 'POST', data),
  updateBank: (data = {}) => requestModel.createApi('/bank/updateBakeInfo', 'POST', data),
  delBank: (data = {}) => requestModel.createApi('/bank/deleteBakeInfo', 'POST', data)
}
export default api
