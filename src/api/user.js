import requestModel from './request'
const api = {
  login: (data = {}) => requestModel.createApi('/user/login', 'POST', data),
  getInfo: (data = {}) => requestModel.createApi('/user/queryUser', 'POST', data),
  updatePwd: (data = {}) => requestModel.createApi('/user/updatePwd', 'POST', data)
}
export default api
