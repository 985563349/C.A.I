import axios from 'axios'
// import { ProjectError } from '@/api/error-handler'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 4000,
  withCredentials: true
})

const ERR_OK = 0

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  const res = response.data

  if (res.code !== ERR_OK) {
    // const fn = ProjectError[res.code] || ProjectError.default
    // fn()

    return Promise.reject(res.message || 'Error')
  } else {
    return res
  }
}, error => {
  return Promise.reject(error)
})

export default request
