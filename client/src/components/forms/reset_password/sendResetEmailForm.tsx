// 3rd party imports
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useForgotPasswordMutation } from '../../../generated/graphql'
import Link from 'next/link'

// My imports d

interface FormValues {
  email: string
}

export const SendResetEmailForm = () => {
  const { handleSubmit, register } = useForm()
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
      <input
        name="email"
        placeholder="email to send reset link"
        type="email"
        ref={register({ required: true })}
      />
      <button type="submit">Change Password</button>
    </form>
  )
}
