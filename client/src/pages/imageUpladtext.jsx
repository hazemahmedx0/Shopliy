import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ImageUpladtext = () => {
  const [image, setImage] = useState(null)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'cpebvpjq')

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dki8wnuwj/image/upload',
        formData,
        { withCredentials: false }
      )
      setImage(response.data.secure_url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" />}
    </div>
  )
}

export default ImageUpladtext
