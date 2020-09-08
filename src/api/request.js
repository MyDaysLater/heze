import axios from 'axios'
import store from '@/store'
import baseURL from '@/config/urlConfig.js'
import { message } from 'ant-design-vue'
import router from '@/router'
import Cookie from 'js-cookie'
function error (error) {
  if (!axios.isCancel(error)) {
    if (error.message.indexOf('timeout') !== -1) {
      message.error('接口请求超时，网络异常')
      return Promise.reject(new Error('接口请求超时，网络异常'))
    } else {
      message.error(error.toString())
      return Promise.reject(new Error(error))
    }
  }
}
function init () {
  const instance = axios.create({
    baseURL,
    timeout: 20000,
    withCredentials: true,
    transformRequest: [function (data) {
      if (data instanceof FormData) {
        return data
      } else {
        let ret = ''
        for (var k in data) {
          if (ret !== '') {
            ret += '&'
          }
          ret += encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
        return ret
      }
    }]
  })
  instance.interceptors.request.use((config) => {
    config.headers.token = Cookie.get('token')
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('pushToken', { cancelToken: cancel })
    })
    return config
  }, error)
  instance.interceptors.response.use((res) => {
    const { data } = res
    if (data.code === 0) {
      return data.data
    } else {
      message.error(data.msg)
      if (data.code === 101) {
        router.push({ name: 'login' })
      }
      return Promise.reject(new Error(data.msg))
    }
  }, error)
  return instance
}

class RequstModule {
  constructor (instance) {
    this.instance = instance
  }

  setConfig (method, data) {
    if (method === 'GET') {
      return {
        params: data
      }
    } else {
      return {
        data
      }
    }
  }

  createApi (url, method, data) {
    const config = {
      url,
      method,
      ...this.setConfig(method, data)
    }
    return this.instance(config)
  }
}
const requestModel = new RequstModule(init())
export default requestModel
