import axios from 'axios'

export default function (opts) {
  // 封装好的get和post接口，调用方法情况action文件
  const $axios = axios.create({
    timeout: 5000, // 设置超时时间
    headers: { 'X-Custom-Header': 'foobar' },
    ...opts
  })

// We cannot extend Axios.prototype
  const axiosExtraProto = {}

// Sets a common header
  axiosExtraProto.setHeader = function setHeader (name, value, scopes = 'common') {
    if (!Array.isArray(scopes)) {
      scopes = [scopes]
    }
    scopes.forEach(scope => {
      if (!value) {
        delete this.defaults.headers[scope][name]
        return
      }
      this.defaults.headers[scope][name] = value
    })
  }

// Set requests token
  axiosExtraProto.setToken = function setToken (token, type, scopes = 'common') {
    const value = !token ? null : (type ? type + ' ' : '') + token
    this.setHeader('Authorization', value, scopes)
  }

// Request helpers
  const reqMethods = [
    'request', 'delete', 'get', 'head', 'options', // url, config
    'post', 'put', 'patch' // url, data, config
  ]
  reqMethods.forEach(method => {
    axiosExtraProto['$' + method] = function () {
      return this[method].apply(this, arguments).then(res => res.data)
    }
  })

// Setup all helpers to axios instance (Axios.prototype cannot be modified)
  function setupHelpers ($axios) {
    for (let key in axiosExtraProto) {
      $axios[key] = axiosExtraProto[key].bind(axios)
    }
  }

  setupHelpers($axios)

// Add a request interceptor
  $axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

// Add a response interceptor
  $axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response
  }, function (error) {
    // Do something with response error
    return Promise.reject(error)
  })

  return $axios
}
