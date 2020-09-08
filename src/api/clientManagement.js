import requestModel from './request'
const api = {
  clientManageList: (data = {}) => requestModel.createApi('/terminal/selectAllTerminal', 'POST', data),
  addclientManageList: (data = {}) => requestModel.createApi('/terminal/insertTerminal', 'POST', data),
  editclientManageList: (data = {}) => requestModel.createApi('/terminal/updateTerminal', 'POST', data),
  deletclientManageList: (data = {}) => requestModel.createApi('/terminal/delTerminal', 'POST', data)
}
export default api
