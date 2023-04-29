import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ImageUpladtext = () => {
  const [image, setImage] = useState(null)

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'h23uih0s')

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dyapzbgmr/image/upload',
        formData
      )
      console.log(response.data.secure_url)
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
