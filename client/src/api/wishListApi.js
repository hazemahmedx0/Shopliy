import axiosClient from './axiosClient'

const wishListApi = {
  addToWishlist: (id) => axiosClient.post(`wishlist/add/${id}`),
  delfromWishlist: (id) => axiosClient.delete(`wishlist/delete/${id}`),
  getall: () => axiosClient.get('wishlist'),
}

export default wishListApi
