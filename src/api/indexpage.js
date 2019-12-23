import axios from '@/utils/axios.js'

export const getpostlist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
