// 3rd party imports
import { useApolloClient } from '@apollo/client'
import { Box, Button, Link } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../generated/graphql'
import { validateEmailOrUsername } from '../../validators/emailOrUsername'
import { validatePassword } from '../../validators/password'
import { InputField } from './InputField'

// My imports

interface LoginFormProps {}
interface FormValues {
  emailOrUsername: string
  password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
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
      <Box mt={2}>
        <InputField
          errors={errors}
          validator={validatePassword}
          register={formRegister}
          fieldName="password"
          placeholder="password"
          type="password"
          fieldLabel="Password"
        />
      </Box>
      <Box mt={1}>
        <Link style={{ color: 'blue' }} href="/forgot-password">
          Forgot password?
        </Link>
      </Box>
      <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
        Login
      </Button>
    </form>
  )
}
