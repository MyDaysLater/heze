import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
Mock.mock('/bankClassification/categoryList', 'post', {
  code: 0,
  data: {
    total: 100,
    list: listFn(10).reduce((init, cur) => {
      init.push({
        id: Random.string('number', 6),
        bankid: Random.string('number', 6),
        bankname: Random.name(),
        branch: Random.name(),
        point: Random.name()
      })
      return init
    }, [])
  }
})
Mock.mock('/bankClassification/addCategory', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/bankClassification/updateCategory', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/bankClassification/deleteCategory', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
