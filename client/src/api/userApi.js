import axiosClient from './axiosClient'

const UserApi = {
  UpdateMe: (params) => axiosClient.put('updateMe', params),
}

export default UserApi
