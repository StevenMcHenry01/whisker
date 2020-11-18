// 3rd party imports
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../../generated/graphql'
import { validateEmailOrUsername } from '../../../validators/emailOrUsername'
import { validatePassword } from '../../../validators/password'
import { InputField } from '../shared/inputField'
import Link from 'next/link'

// My imports

interface LoginFormProps { }
interface FormValues {
  emailOrUsername: string
  password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm()
  const [login] = useLoginMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const response = await login({ variables: values })
    if (response.data?.login.user) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        register={formRegister}
        validator={validateEmailOrUsername}
        fieldName="emailOrUsername"
        placeholder="email or username"
        fieldLabel="Email or Username"
      />
      <div>
        <InputField
          errors={errors}
          validator={validatePassword}
          register={formRegister}
          fieldName="password"
          placeholder="password"
          type="password"
          fieldLabel="Password"
        />
      </div>
      <div>
        <Link href="/send-reset-email">Forgot password?</Link>
      </div>
      <button type="submit">Login</button>
      <div>
        Don't have an account? <Link href="/register">Register</Link>
      </div>
    </form>
  )
}
