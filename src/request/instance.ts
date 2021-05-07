/**
 * 全局唯一axios实例
 */

import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : '/epsvt/api'

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

export default instance