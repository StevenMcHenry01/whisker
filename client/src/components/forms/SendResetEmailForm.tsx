// 3rd party imports
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useForgotPasswordMutation } from '../../generated/graphql'
import { validateEmail } from '../../validators/email'
import { InputField } from './InputField'
import Link from 'next/link'

// My imports d

interface SendResetEmailFormProps {}
interface FormValues {
  email: string
}

export const SendResetEmailForm: React.FC<SendResetEmailFormProps> = ({}) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm()
  const [forgotPassword] = useForgotPasswordMutation()
  const [emailSent, setEmailSent] = useState(false)

  const onSubmit = async (values: FormValues) => {
    await forgotPassword({ variables: values })
    setEmailSent(true)
  }

  if (emailSent) {
    return (
      <div>
        <p>Email Sent!</p>
        <div>
          <Link href="/">Go home</Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        validator={validateEmail}
        register={formRegister}
        fieldName="email"
        placeholder="email"
        fieldLabel="Email to send reset link"
        type="email"
      />
      <button type="submit">Change Password</button>
    </form>
  )
}
