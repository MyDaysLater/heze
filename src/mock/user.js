import Mock from 'mockjs'
const Random = Mock.Random
Mock.mock('/user/login', 'post', {
  code: 0,
  data: {
    PASSWORD: Random.string(32),
    USER_NAME: Random.name()
  }
})
Mock.mock('/user/queryUser', 'post', {
  code: 0,
  data: {
    PASSWORD: Random.string(32),
    USER_NAME: Random.name()
  }
})
