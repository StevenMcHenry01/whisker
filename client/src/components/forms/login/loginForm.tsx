// 3rd party imports
import React from 'react'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

// My imports
import { useLoginMutation } from '../../../generated/graphql'

interface LoginFormProps { }
interface FormValues {
  emailOrUsername: string
  password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ }) => {
  const { handleSubmit, errors, register, formState } = useForm()
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
      <input name="emailOrUsername" placeholder="email or username" type="text" ref={register({ required: true })} />
      <div>
        <input name="password" placeholder="password" type="password" ref={register({ required: true })} />
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
