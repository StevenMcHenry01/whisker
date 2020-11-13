// 3rd party imports
import { useForm } from 'react-hook-form'
import React from 'react'
import { useRouter } from 'next/router'
import { useRegisterMutation } from '../../generated/graphql'
import { validateEmail } from '../../validators/email'
import { validatePassword } from '../../validators/password'
import { validateUsername } from '../../validators/username'
import { InputField } from './InputField'
import { useApolloClient } from '@apollo/client'

interface RegisterFormProps {}
interface FormValues {
  email: string
  username: string
  password: string
}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
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
      <InputField
        errors={errors}
        validator={validateUsername}
        register={formRegister}
        fieldName="username"
        placeholder="username"
        fieldLabel="Username"
      />

      <InputField
        errors={errors}
        validator={validateEmail}
        register={formRegister}
        fieldName="email"
        placeholder="email"
        fieldLabel="Email"
      />

      <InputField
        errors={errors}
        validator={validatePassword}
        register={formRegister}
        fieldName="password"
        placeholder="password"
        type="password"
        fieldLabel="Password"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
