import request from '@/api'

export function signIn (data) {
  return request({
    url: '/signIn',
    method: 'POST',
    data
  })
}

export function test () {
  return request({
    url: '/test',
    method: 'get',
    params: {
      a: 'a',
      b: 'b'
    }
  })
}
