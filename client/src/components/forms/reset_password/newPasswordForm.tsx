// 3rd party imports
import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../../../generated/graphql'
import { InputField } from '../shared/inputField'
import { validatePassword } from '../../../validators/password'
import { useRouter } from 'next/router'

// My imports

interface NewPasswordFormProps {
  token: string
}
interface FormValues {
  newPassword: string
}

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  token,
}: NewPasswordFormProps) => {
  const { handleSubmit, errors, register: formRegister, formState, setError } = useForm()
  const [changePassword] = useChangePasswordMutation()
  const router = useRouter()

  const onSubmit = async (values: FormValues) => {
    const response = await changePassword({
      variables: { token, newPassword: values.newPassword },
    })

    if (!response.data?.changePassword.user) {
      setError('newPassword', { message: 'There was an error.' })
    } else {
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        validator={validatePassword}
        register={formRegister}
        fieldName="newPassword"
        placeholder="new password"
        fieldLabel="New Password"
        type="password"
      />
      <button type="submit">Change Password</button>
    </form>
  )
}
