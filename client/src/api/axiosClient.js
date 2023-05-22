import axios from 'axios'
import queryString from 'query-string'

const baseUrl = 'https://api.hazemmahdyd.net/'
const getToken = () => {
  return localStorage.getItem('token')
}
const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: () => ({
    'content-type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  }),
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: () => ({
      'content-type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    }),
  }
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (err) => {
    if (!err.response) {
      return err
    }
    throw err.response
  }
)

export default axiosClient
