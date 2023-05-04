import axiosClient from './axiosClient'

const productApi = {
  getAllProducts: () => axiosClient.get('products'),
  //   login: (params) => axiosClient.post('login', params),
  //   loginget: () => axiosClient.get('login'),
  //   verifyUser: () => axiosClient.get('me'),
}

export default productApi
