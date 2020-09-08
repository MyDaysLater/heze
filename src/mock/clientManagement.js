import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
Mock.mock('/clientManage/list', 'post', {
  code: 0,
  data: {
    list: listFn(100).reduce((init, cur) => {
      init.push({
        clientid: Random.string('number', 8),
        bankname: Random.name(),
        branch: Random.name(),
        banktype: 1,
        point: Random.name(),
        addres: Random.url('http'),
        devid: Random.name(),
        contName: Random.name(),
        phone: Random.string('number', 11),
        equipment: Random.name(),
        pcard: Random.string('number', 8),
        pcardHandling: Random.string('number', 8),
        status: 1
      })
      return init
    }, [])
  }
})
Mock.mock('/clientManage/add', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/clientManage/update', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/clientManage/delete', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
