import axiosClient from './axiosClient'

const cartApi = {
  getMyCart: () => axiosClient.get('cart'),
  addProduct: (id) => axiosClient.post(`cart/add/${id}`),
  incPrdocutQuantity: (id) => axiosClient.put(`cart/inc/${id}`),
  decPrdocutQuantity: (id) => axiosClient.put(`cart/dec/${id}`),
  deleteProduct: (id) => axiosClient.delete(`cart/delete/${id}`),
}

export default cartApi
