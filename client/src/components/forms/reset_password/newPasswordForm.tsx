// 3rd party imports
import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../../../generated/graphql'
import { useRouter } from 'next/router'

// My imports
import styles from '../shared/Form.module.scss'
import { Button } from '../../utils/buttons/button'

interface NewPasswordFormProps {
  token: string
}
interface FormValues {
  newPassword: string
}

export const NewPasswordForm: React.FC<NewPasswordFormProps> = ({
  token,
}: NewPasswordFormProps) => {
  const { handleSubmit, register, setError, errors } = useForm()
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
        className={styles.input_container}
        name="newPassword"
        placeholder="new password"
        type="password"
        ref={register({ required: true })}
      />
      {errors.newPassword && (
        <p className={styles.error_message}>{errors.newPassword.message}</p>
      )}
      <Button type="submit">Change Password</Button>
    </form>
  )
}
