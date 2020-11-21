// 3rd party imports
import { useForm } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '../../../generated/graphql'
import { useApolloClient } from '@apollo/client'

interface RegisterFormProps { }
interface FormValues {
  email: string
  username: string
  password: string
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ }) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm()
  const [register] = useRegisterMutation()
  const router = useRouter()
  const apolloClient = useApolloClient()

  const onSubmit = async (values: FormValues) => {
    const response = await register({ variables: values })
    if (response.data?.register.user) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="username" placeholder="username" type="text" ref={formRegister({ required: true })} />

      <input name="email" placeholder="email" type="email" ref={formRegister({ required: true })} />

      <input name="password" placeholder="password" type="password" ref={formRegister({ required: true })} />
      <button type="submit">Submit</button>
    </form>
  )
}
