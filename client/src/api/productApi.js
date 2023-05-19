import axiosClient from './axiosClient'

const productApi = {
  getAllProducts: () => axiosClient.get('availableProducts'),
  getProductById: (id) => axiosClient.get(`products/${id}`),
  adminProduts: () => axiosClient.get('allProducts'),
  availabilityChange: (id, params) =>
    axiosClient.put(`products/update/${id}`, params),
  addProduct: (params) => axiosClient.post('products/add', params),
  editProduct: (id, params) => axiosClient.put(`products/update/${id}`, params),
  deleteProduct: (id) => axiosClient.delete(`products/delete/${id}`),
  catProducts: (id) => axiosClient.get(`categories/${id}`),
}

export default productApi
