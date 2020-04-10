import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 4000,
  withCredentials: true
})

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

request.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export default request
