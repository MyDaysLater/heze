import Mock from 'mockjs'
import listFn from './methods'
const Random = Mock.Random
Mock.mock('/cardInfo/cardList', 'post', {
  code: 0,
  data: {
    pageBean: {
      total: 200,
      list: listFn(10).reduce((init, cur) => {
        init.push({
          percard: Random.string('number', 18),
          pername: Random.name(),
          clientid: Random.string('number', 6),
          bankname: Random.string(6),
          cjbh: Random.string('number', 8),
          crdcsn: Random.string('number', 18),
          crdbankno: Random.string('number', 18),
          cardatr: Random.string('number', 18),
          bankcode: Random.string('number', 6),
          oldcardno: Random.string('number', 10),
          newcardno: Random.string('number', 10),
          userName: Random.name(),
          phone: Random.string('number', 11),
          time: Random.date('yyyy-mm-dd')
        })
        return init
      }, [])
    },
    entity: {
      successNum: 100,
      failNum: 20
    }
  }
})
