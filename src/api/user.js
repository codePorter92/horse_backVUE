import axios from '@/utils/axios.js'

export const userlogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
