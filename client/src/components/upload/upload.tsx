// 3rd party imports
import React, { SetStateAction, useState } from 'react'
import { useUploadCatPhotoMutation } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'
import Loading from '../utils/loading/loading'

// My imports

export const Upload = () => {
  const [uploadCatPhoto, { loading }] = useUploadCatPhotoMutation()
  const [fileInput] = useState('')
  const [uploadedFile, setUploadedFile] = useState()
  const [previewSource, setPreviewSource] = useState(undefined)

  const handleFileInput = (e: any) => {
    const file = e.target.files[0]
    setUploadedFile(file)
    previewFile(file)
  }

  const previewFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource((reader.result as unknown) as SetStateAction<undefined>)
    }
  }

  const handleSubmitFile = (e: any) => {
    e.preventDefault()
    if (!previewSource) return
    uploadImage(uploadedFile)
  }

  const uploadImage = async (file: any) => {
    try {
      const uploadedPhoto = await uploadCatPhoto({ variables: { file } })
      console.log(uploadedPhoto)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <Loading />
  }
  return (
    <div>
      <input
        type="file"
        name="image"
        onChange={handleFileInput}
        value={fileInput}
      />
      <Button onClick={handleSubmitFile}>Submit</Button>
      {previewSource && (
        <img
          src={previewSource}
          style={{ height: '300px' }}
          alt="preview upload"
        />
      )}
    </div>
  )
}
