import requestModel from './request'
const api = {
  userList: (data = {}) => requestModel.createApi('/user/selectAllUser', 'POST', data),
  adduserList: (data = {}) => requestModel.createApi('/user/insertUser', 'POST', data),
  edituserList: (data = {}) => requestModel.createApi('/user/updateUserInfo', 'POST', data),
  deluserList: (data = {}) => requestModel.createApi('/user/delUser', 'POST', data)
}
export default api
