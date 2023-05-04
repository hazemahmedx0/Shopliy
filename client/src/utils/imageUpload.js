import axios from 'axios'
axios.defaults.withCredentials = true

const handleImageUpload = async (image) => {
  const file = image
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'cpebvpjq')

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dki8wnuwj/image/upload',
      formData,
      { withCredentials: false } // Add this line to set withCredentials to true
    )
    return response.data.secure_url
  } catch (error) {
    return error
  }
}

export default handleImageUpload
