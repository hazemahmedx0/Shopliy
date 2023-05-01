import axiosClient from './axiosClient'

const authAPI = {
  signup: (params) => axiosClient.post('signup', params),
  login: (params) => axiosClient.post('login', params),
  loginget: () => axiosClient.get('login'),
  verifyUser: () => axiosClient.get('me'),
}

export default authAPI
