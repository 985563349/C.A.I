import request from '@/api'

export const getTableList = () => {
  return request({
    url: '/table/list',
    method: 'GET'
  })
}
