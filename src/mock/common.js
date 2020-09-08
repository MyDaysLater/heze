import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
Mock.mock('/bank/bankSuport', 'post', {
  code: 0,
  data: listFn(10).reduce((init) => {
    init.push({
      id: Random.string('number', 10),
      name: Random.name()
    })
    return init
  }, [])
})
