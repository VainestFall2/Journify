import { axiosInstance } from "../api/axiosInstance"


export default async function uploadImage(imageFile: File) {
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    const response = await axiosInstance.post('image-upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data
  } catch (error) {
    console.error('Error while uploading image', error)
  }
}
