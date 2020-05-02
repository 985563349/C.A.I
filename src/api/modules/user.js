import request from '@/api'

export const signIn = data => {
  return request({
    url: '/signIn',
    method: 'POST',
    data
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export const getUserInfo = () => {
  return request({
    url: '/userInfo',
    method: 'get'
  })
}
