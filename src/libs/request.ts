import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : ''

let instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  timeout: 5 * 1000
})

instance.interceptors.request.use(
  (config) => {
    config.headers.token = ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status === 200) {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
function get(url: string, params: object) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
function post(url: string, params: object) {
  return new Promise((resolve, reject) => {
    instance.post(url, {
      data: params
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export {
  get,
  post
}