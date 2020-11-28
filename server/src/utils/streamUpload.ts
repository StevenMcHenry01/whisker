import { UploadApiResponse } from 'cloudinary'
import { FileUpload } from 'graphql-upload'
import { cloudinary } from './cloudinary'

const streamUpload = (file: FileUpload): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        folder: 'whisker',
        allowed_formats: ['jpg', 'jpeg', 'png', 'heif', 'gif', 'svg', 'webP'],
      },
      (error: any, result: any) => {
        if (result) {
          resolve(result)
        } else {
          reject(error)
        }
      }
    )
    file.createReadStream().pipe(uploadStream)
  })
}

export const uploadToCloudinary = async (file: FileUpload) => {
  const result: UploadApiResponse = await streamUpload(file)
  return result
}
