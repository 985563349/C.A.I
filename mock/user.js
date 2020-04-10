export default [
  {
    url: '/api/signIn',
    method: 'post',
    response (req) {
      const { username, password } = req.body
      let result

      if (username === 'admin' && password === 'admin') {
        result = {
          code: 0,
          data: {
            token: 'token'
          },
          message: '获取数据成功'
        }
      } else {
        result = {
          code: -1,
          data: {},
          message: '账号或密码错误'
        }
      }

      return result
    }
  },
  {
    url: '/api/test',
    method: 'get',
    response () {
      return {
        code: 0,
        data: {},
        message: '请求成功'
      }
    }
  }
]
