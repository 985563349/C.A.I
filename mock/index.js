import Mock from 'mockjs'
import qs from 'qs'

import user from './user'

Mock.setup({
  timeout: 300
})

const mocks = [
  ...user
]

export function mockXHR () {
  function XHR2ExpressReqWrap (respond) {
    return function (options) {
      const { url, type, body } = options
      let result

      if (respond instanceof Function) {
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: qs.parse(url.split('?')[1])
        })
      } else {
        result = respond
      }

      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.method || 'get', XHR2ExpressReqWrap(i.response))
  }
}
