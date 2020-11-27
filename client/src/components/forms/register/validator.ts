import { ErrorOption } from 'react-hook-form'

interface validatorParams {
  response: any
  setError: (name: string, error: ErrorOption) => void
}

export const validator = ({ response, setError }: validatorParams) => {
  if (response?.data?.register?.errors![0]?.field === 'username') {
    setError('username', {
      type: 'manual',
      message: response.data.register.errors[0].message,
    })
  }
  if (response?.data?.register?.errors![0]?.field === 'email') {
    setError('email', {
      type: 'manual',
      message: response.data.register.errors[0].message,
    })
  }
  if (response?.data?.register?.errors![0]?.field === 'password') {
    setError('password', {
      type: 'manual',
      message: response.data.register.errors[0].message,
    })
  }
}
