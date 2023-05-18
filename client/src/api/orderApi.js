import axiosClient from './axiosClient'

const orderApi = {
  addOrder: (params) => axiosClient.post('orders/add', params),
  getMyOrders: () => axiosClient.get('myorders'),
  getAllOrders: () => axiosClient.get('orders'),
  deleteOrder: (id) => axiosClient.delete(`orders/delete/${id}`),
}

export default orderApi
