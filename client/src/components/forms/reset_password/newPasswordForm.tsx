// 3rd party imports
import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../../../generated/graphql'
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
  const { handleSubmit, register, setError } = useForm()
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
      <input
        name="newPassword"
        placeholder="new password"
        type="password"
        ref={register({ required: true })}
      />
      <button type="submit">Change Password</button>
    </form>
  )
}
