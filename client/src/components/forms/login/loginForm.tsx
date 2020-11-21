// 3rd party imports
import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

// My imports
import { InputField } from '../shared/inputField'
import { useLoginMutation } from '../../../generated/graphql'
import { validatePassword } from '../../../validators/password'

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
        validator={{ required: true }}
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
