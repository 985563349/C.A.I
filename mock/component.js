export default [
  {
    url: '/table/list',
    method: 'get',
    response: {
      code: 0,
      'data|10': [
        {
          id: '@guid',
          name: '@cname',
          age: '@integer(20, 80)',
          gender: '@integer(0, 1)',
          date: '@date(yyyy-MM-dd HH:mm:ss)',
          address: '@city(true)'
        }
      ],
      message: '请求成功'
    }
  }
]
