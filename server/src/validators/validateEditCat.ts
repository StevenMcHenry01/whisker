import { FieldError } from 'src/graphqlTypes/FieldError'
import { CreateCatInput } from '../graphqlTypes/CreateCatInput'

export const validateEditCat = (options: CreateCatInput): [FieldError] | null => {
  if (options.name.length > 20) {
    return [
      {
        field: 'name',
        message: 'that name is a bit too long.',
      },
    ]
  }

  if (options.bio.length > 1000) {
    return [
      {
        field: 'bio',
        message: 'that bio is a bit too long.',
      },
    ]
  }

  if (options.breed.length > 20) {
    return [
      {
        field: 'breed',
        message: 'that breed is a bit too long.',
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
