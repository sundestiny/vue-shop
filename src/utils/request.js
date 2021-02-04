import axios from "axios";
const request = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/' // 请求的基础路径
})
//配置请求拦截器
request.interceptors.request.use((config) => {
  //配置token
  config.headers.Authorization=window.sessionStorage.getItem('user')
  return config
})
export default request
