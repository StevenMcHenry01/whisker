import { ErrorOption } from 'react-hook-form'

interface validatorParams {
  response: any
  setError: (name: string, error: ErrorOption) => void
}

export const validator = ({ response, setError }: validatorParams) => {
  if (response?.data?.createCat?.errors![0]?.field === 'name') {
    setError('name', {
      type: 'manual',
      message: response.data.createCat.errors[0].message,
    })
  }
  if (response?.data?.createCat?.errors![0]?.field === 'sex') {
    setError('sex', {
      type: 'manual',
      message: response.data.createCat.errors[0].message,
    })
  }
  if (response?.data?.createCat?.errors![0]?.field === 'age') {
    setError('age', {
      type: 'manual',
      message: response.data.createCat.errors[0].message,
    })
  }
  if (response?.data?.createCat?.errors![0]?.field === 'breed') {
    setError('breed', {
      type: 'manual',
      message: response.data.createCat.errors[0].message,
    })
  }
  if (response?.data?.createCat?.errors![0]?.field === 'bio') {
    setError('bio', {
      type: 'manual',
      message: response.data.createCat.errors[0].message,
    })
  }
}
