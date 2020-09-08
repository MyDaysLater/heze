import Mock from 'mockjs'

if (process.env.NODE_ENV !== 'production') {
  require('./user')
  require('./mainBoard')
  require('./common')
  require('./cardState')
  require('./userManagement')
  require('./bankClassification')
  Mock.setup({
    timeout: '1000-2000'
  })
}
