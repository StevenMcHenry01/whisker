// 3rd party imports
import React, { SetStateAction, useState } from 'react'

// My imports
import { useUploadCatPhotoMutation } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'
import Loading from '../utils/loading/loading'
import styles from './Upload.module.scss'

interface UploadProps {
  uploadedPhotos: number[]
  setUploadedPhotos: React.Dispatch<React.SetStateAction<number[]>>
  inputName: string
}

export const Upload = ({
  uploadedPhotos,
  setUploadedPhotos,
  inputName,
}: UploadProps) => {
  const [labelValue, setLabelValue] = useState('Find image')
  const [uploadButtonValue, setUploadButtonValue] = useState('Upload')
  const [uploadCatPhoto, { loading }] = useUploadCatPhotoMutation()
  const [error, setError] = useState(false)
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
      if (uploadedPhoto.data?.uploadCatPhoto?.errors) {
        setError(true)
        return
      }
      if (uploadedPhoto.data?.uploadCatPhoto?.pic) {
        setError(false)
        setUploadedPhotos([
          ...uploadedPhotos,
          uploadedPhoto.data.uploadCatPhoto.pic.id,
        ])
        setPreviewSource(undefined)
        setLabelValue('Success!')
        setUploadButtonValue('Uploaded')
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <Loading delay={0} />
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input
        type="file"
        name={inputName}
        id={inputName}
        onChange={handleFileInput}
        className={styles.inputfile}
        value={fileInput}
      />
      <label
        htmlFor={inputName}
        className={`${styles.upload_button} ${
          labelValue === 'Success!' ? styles.upload_button_success : null
        }`}
      >
        {labelValue}
      </label>
      <div style={{ display: 'inline-block' }}>
        {previewSource && (
          <img
            src={previewSource}
            style={{ height: '4rem', width: '4rem', display: 'block' }}
            alt="preview upload"
          />
        )}
        {error && (
          <p style={{ color: 'var(--color-error)', margin: '.2rem 0' }}>
            There was an error uploading the photo.
          </p>
        )}
      </div>
      <Button
        onClick={handleSubmitFile}
        disabled={labelValue === 'Success!'}
        style={{
          backgroundColor:
            labelValue === 'Success!' ? '#935c70' : 'var(--color-main-salmon)',
          fontSize: '.6rem',
          pointerEvents: labelValue === 'Success!' ? 'none' : 'auto',
        }}
      >
        {uploadButtonValue}
      </Button>
    </div>
  )
}
