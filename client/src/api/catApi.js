import axiosClient from './axiosClient'

const catApi = {
  allCat: () => axiosClient.get('categories'),
  editCat: (id, params) => axiosClient.put(`categories/update/${id}`, params),
  deleteCat: (id) => axiosClient.delete(`categories/delete/${id}`),
  addCat: (params) => axiosClient.post('categories/add', params),
}

export default catApi
