import axios from 'axios'
import qs from 'qs'
import store from 'store/index'

axios.defaults.baseURL = 'http://localhost:8081/api/'
axios.defaults.timeout = 5000

const request = axios.create()

request.interceptors.request.use(
  (config) => {
    // 在请求或响应被 then 或 catch 处理前拦截它们。
    // 在发送请求之前做些什么
    if (config.showLoading) {
      store.commit('SET_LOADING', { isLoading: true })
    }
    config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.config.showLoading) {
      setTimeout(function () {
        store.commit('SET_LOADING', { isLoading: false })
      }, 800)
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('SET_NETWORK', false)
    }
  }
)

class Request {
  createError = (code, resp) => {
    const err = new Error(resp.message)
    err.code = code
    return err
  };

  handleRequest = (request) => {
    return new Promise((resolve, reject) => {
      request
        .then((res) => {
          const data = res.data
          if (!data) {
            return reject(this.createError(400, 'no data'))
          }
          resolve(data) // 异步操作成功时调用，并将异步操作的结果作为参数传递出去
        })
        .catch((err) => {
          const resp = err.response
          console.log('---------------', resp)
          if (resp.status === 404) {
            reject(this.createError(404, 'need auth')) // 异步操作失败时调用，并将异步操作爆出的错误作为参数传递出去
          }
        })
    })
  };
  handleAll = (request) => {
  // promisory一个promise工厂
    let args = []
    for (let i = 0; i < request.length; i++) {
      args.push(`data${i}`)
    }
    return new Promise((resolve, reject) => {
      axios
        .all(request)
        .then(
          axios.spread((...args) => {
            resolve(args)
          })
        )
        .catch((err) => {
          console.log(err)
          reject(this.createError(401, 'need auth'))
        })
    })
  };
  /**
    * GET类型的网络请求
   **/
  get (url, data) {
    // data是对象
    return this.handleRequest(
      request.get(url, {
        params: data,
        showLoading: true
      })
    )
  }
  /**
    * POST类型的网络请求
   **/
  post (url, data) {
    // data是对象
    return this.handleRequest(
      request.post(url, {
        data: data,
        showLoading: true
      })
    )
  }
  /**
    * DELETE类型的网络请求
   **/
  delete (url, data) {
    // data是对象
    return this.handleRequest(
      request.delete(url, {
        params: data,
        showLoading: true
      })
    )
  }
}

export default new Request()
