import axios from '@/utils/axios.js'

export const getpostlist = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const getlistitem = () => {
  return axios({
    url: '/category'
  })
}

export const postlist = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
