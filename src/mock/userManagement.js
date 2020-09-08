import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
const arr = [1, 2, 3, 4, 5, 6, 7]
Mock.mock('/userManagement/list', 'post', {
  code: 0,
  data: {
    list: listFn(100).reduce((init, cur) => {
      init.push({
        userName: Random.name(),
        roleId: arr[Math.ceil(Math.random() * arr.length - 1)],
        role: Random.name(),
        bankname: Random.name(),
        branch: Random.name(),
        point: Random.name(),
        realName: Random.name(),
        tel: Random.string('number', 11)
      })
      return init
    }, [])
  }
})
Mock.mock('/userManagement/add', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/support/roles', 'post', {
  code: 0,
  data: {
    list: [
      {
        id: 1,
        name: '管理员'
      },
      {
        id: 2,
        name: '运维人员'
      },
      {
        id: 3,
        name: '终端工作人员'
      }
      // {
      //   id: 5,
      //   name: '支行用户'
      // },
      // {
      //   id: 6,
      //   name: '省行用户'
      // }
    ]
  }
})
Mock.mock('/userManagement/update', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/user/delete', 'post', {
  code: 0,
  data: {
    msg: '成功'
  }
})
Mock.mock('/userManagement/initPwd', 'post', {
  code: 0,
  data: {
    newPassword: '123456'
  }
})
