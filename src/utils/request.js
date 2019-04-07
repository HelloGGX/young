import axios from 'axios'
// import qs from 'qs'
import store from 'store/index'
import router from 'router/router'

axios.defaults.baseURL = 'https://api.mlwei.com'
axios.defaults.timeout = 5000

const request = axios.create()
// let CancelToken = axios.CancelToken // 取消请求
const tips = {
  401: '抱歉，你还未登陆',
  403: '登录过期，请重新登录',
  404: '网络请求不存在'
}
request.interceptors.request.use(
  (config) => {
    // 在请求或响应被 then 或 catch 处理前拦截它们。
    // 在发送请求之前做些什么
    // let requestName = config.data.requestName
    // if (requestName) {
    //   if (axios[requestName] && axios[requestName].cancel) {
    //     axios[requestName].cancel()
    //   }
    //   config.cancelToken = new CancelToken(c => {
    //     axios[requestName] = {}
    //     axios[requestName].cancel = c
    //   })
    // }
    if (config.showLoading) {
      store.commit('SET_LOADING', true)
    }
    // config.data = qs.stringify(config.data)
    config.headers = {
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    if (response.config.showLoading) {
      setTimeout(function () {
        store.commit('SET_LOADING', false)
      }, 800)
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
        case 403:

          error.message = tips[error.response.status]

          // 清除token
          localStorage.removeItem('token')
          store.commit('loginSuccess', false)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break
          // 404请求不存在
        case 404:
          error.message = tips[error.response.status]
          break
          // 其他错误，直接抛出错误提示
        default:
          error.message = error.response.data.message
      }
      return Promise.reject(error.response)
    } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      store.commit('SET_NETWORK', false)
    }
  }
)

class HTTP {
  createError (code, resp) {
    const err = new Error(resp.message)
    err.code = code
    return err
  };

  handleRequest (request) {
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
          console.log(err)
          if (resp.status === 404) {
            reject(this.createError(404, 'need auth')) // 异步操作失败时调用，并将异步操作爆出的错误作为参数传递出去
          }
        })
    })
  };
  handleAll (request) {
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

export { HTTP }
