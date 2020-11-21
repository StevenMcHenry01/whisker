import { FieldError } from 'src/graphqlTypes/FieldError'
import { CreateCatInput } from '../graphqlTypes/CreateCatInput'

export const validateCat = (options: CreateCatInput): [FieldError] | null => {
  if (options.sex !== 'male' || 'female' || 'other') {
    return [
      {
        field: 'sex',
        message: 'invalid sex.',
      },
    ]
  }

  if (typeof options.age !== 'number') {
    return [
      {
        field: 'age',
        message: 'age must be a valid number.',
      },
    ]
  }

  return null
}
