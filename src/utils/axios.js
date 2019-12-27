import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'

// 添加拦截器
axios.interceptors.request.use(function (config) {
//   console.log(config)
  let token = localStorage.getItem('horse_back_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default axios
