// 3rd party imports
import React, { useState } from 'react'
import { useUploadCatPhotoMutation } from '../../generated/graphql'

// My imports

interface UploadProps {

}

export const Upload: React.FC<UploadProps> = ({ }) => {

  const [uploadCatPhoto] = useUploadCatPhotoMutation()
  const [fileInput, setFileInput] = useState('')
  const [uploadedFile, setUploadedFile] = useState()
  const [previewSource, setPreviewSource] = useState(null)
  const [selectedFile, setSelectedFile] = useState('')

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    setUploadedFile(file)
    previewFile(file)
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    e.preventDefault()
    if (!previewSource) return
    uploadImage(uploadedFile)
  }

  const uploadImage = async (file) => {
    try {
      uploadCatPhoto({ variables: { file, id: 2 } })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <input type="file" name="image" onChange={handleFileInput} value={fileInput} />
        <button type="submit">Submit</button>
      </form>
      {previewSource && (
        <img src={previewSource} style={{ height: '300px' }} />
      )}
    </div>
  )
}
