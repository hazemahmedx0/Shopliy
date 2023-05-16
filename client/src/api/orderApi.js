import axiosClient from './axiosClient'

const orderApi = {
  addOrder: (params) => axiosClient.post('orders/add', params),
  getMyOrders: () => axiosClient.get('myorders'),
}

export default orderApi
