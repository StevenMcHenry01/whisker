import { FieldError } from 'src/graphqlTypes/FieldError'
import { NewPasswordInput } from '../graphqlTypes/NewPasswordInput'

export const validatePassword = (options: NewPasswordInput): [FieldError] | null => {
  if (options.newPassword.length <= 5) {
    return [
      {
        field: 'new password',
        message: 'password length must be greater than 5 characters.',
      },
    ]
  }

  return null
}
