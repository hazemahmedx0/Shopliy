import axiosClient from './axiosClient'

const productApi = {
  getAllProducts: () => axiosClient.get('availableProducts'),
  getProductById: (id) => axiosClient.get(`products/${id}`),
  adminProduts: () => axiosClient.get('allProducts'),
  availabilityChange: (id, params) =>
    axiosClient.put(`products/update/${id}`, params),
  //   login: (params) => axiosClient.post('login', params),
  //   loginget: () => axiosClient.get('login'),
  //   verifyUser: () => axiosClient.get('me'),
}

export default productApi
