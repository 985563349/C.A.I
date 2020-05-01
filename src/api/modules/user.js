import request from '@/api'

export function signIn (data) {
  return request({
    url: '/signIn',
    method: 'POST',
    data
  })
}

export function getUserInfo () {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}
