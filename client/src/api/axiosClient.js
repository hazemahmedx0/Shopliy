import axios from 'axios'
import queryString from 'query-string'

const baseUrl = 'https://shopliy-production-ee12.up.railway.app/'

const axiosClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  // Get the token from cookies and include it in the Authorization header
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  )
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
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
