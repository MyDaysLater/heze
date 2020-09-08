import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
Mock.mock('/client/clientList', 'post', {
  code: 0,
  data: listFn(100).reduce((init) => {
    init.push({
      clientid: Random.string('number', 6),
      clientOnLine: 0,
      version: Random.string('number', 6),
      portName: Random.name(),
      status: 0
    })
    return init
  }, [])
})
Mock.mock('/client/innerDataList', 'post', {
  code: 0,
  data: listFn(4).reduce((init) => {
    init.push({
      deviceName: Random.name(),
      deviceStatus: 1,
      errorInfo: Random.string(30)
    })
    return init
  }, [])
})
