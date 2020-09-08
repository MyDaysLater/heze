import userApi from './user'
import clientApi from './mainBoard'
import common from './common'
import cardState from './cardState'
import clientManageApi from './clientManagement'
import userManagement from './userManagement'
import bankClassification from './bankClassification'
const http = {
  ...userApi,
  ...clientApi,
  ...common,
  ...cardState,
  ...clientManageApi,
  ...userManagement,
  ...bankClassification
}
export default http
