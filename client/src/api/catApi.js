import axiosClient from './axiosClient'

const catApi = {
  allCat: () => axiosClient.get('categories'),
}

export default catApi
