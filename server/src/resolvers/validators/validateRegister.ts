import { FieldError } from 'src/graphqlTypes/FieldError'
import { RegisterInput } from 'src/graphqlTypes/RegisterInput'

export const validateRegister = (options: RegisterInput): [FieldError] | null => {
  // verify email
  if (!options.email.includes('@') || !options.email.includes('.')) {
    return [
      {
        field: 'email',
        message: 'must enter a valid email address.',
      },
    ]
  }

  // check for username length
  if (options.username.length <= 2) {
    return [
      {
        field: 'username',
        message: 'length must be greater than 2 characters.',
      },
    ]
  }

  // check for username length
  if (options.username.includes('@')) {
    return [
      {
        field: 'username',
        message: 'username may not resemble an email address.',
      },
    ]
  }

  // check for password length
  if (options.password.length <= 5) {
    return [
      {
        field: 'password',
        message: 'length must be greater than 5 characters.',
      },
    ]
  }

  return null
}
