// 3rd party imports
import { Button } from '@chakra-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { useChangePasswordMutation } from '../../generated/graphql'
import { InputField } from '../shared/InputField'
import { validatePassword } from '../utils/validators/password'

// My imports

interface ChangePasswordFormProps {
  token: string
}
interface FormValues {
  newPassword: string
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  token,
}: ChangePasswordFormProps) => {
  const {
    handleSubmit,
    errors,
    register: formRegister,
    formState,
    setError,
  } = useForm()
  const [changePassword] = useChangePasswordMutation()
  const history = useHistory()

  const onSubmit = async (values: FormValues) => {
    const response = await changePassword({
      variables: { token, newPassword: values.newPassword },
    })

    console.log(response)

    if (!response.data?.changePassword.user) {
      setError('newPassword', { message: 'There was an error.' })
    } else {
      history.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        validator={validatePassword}
        register={formRegister}
        fieldName='newPassword'
        placeholder='new password'
        fieldLabel='New Password'
        type='password'
      />
      <Button
        mt={4}
        variantColor='teal'
        isLoading={formState.isSubmitting}
        type='submit'
      >
        Change Password
      </Button>
    </form>
  )
}
