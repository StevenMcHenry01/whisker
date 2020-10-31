// 3rd party imports
import { useForm } from 'react-hook-form'
import React from 'react'
import { Button } from '@chakra-ui/core'
import { InputField } from '../../shared/InputField'

// My imports
import { validateUsername } from '../../utils/validators/username'
import { validateEmail } from '../../utils/validators/email'
import { validatePassword } from '../../utils/validators/password'
import { useRegisterMutation } from '../../../generated/graphql'

interface RegisterFormProps {}
interface FormValues {
  email: string
  username: string
  password: string
}

export const RegisterForm: React.FC<RegisterFormProps> = ({}) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm()
  const [register] = useRegisterMutation()

  const onSubmit = async (values: FormValues) => {
    const response = await register({ variables: values })
    console.log(response)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        errors={errors}
        validator={validateUsername}
        register={formRegister}
        fieldName='username'
        placeholder='username'
        fieldLabel='Username'
      />

      <InputField
        errors={errors}
        validator={validateEmail}
        register={formRegister}
        fieldName='email'
        placeholder='email'
        fieldLabel='Email'
      />

      <InputField
        errors={errors}
        validator={validatePassword}
        register={formRegister}
        fieldName='password'
        placeholder='password'
        type='password'
        fieldLabel='Password'
      />
      <Button
        mt={4}
        variantColor='teal'
        isLoading={formState.isSubmitting}
        type='submit'
      >
        Submit
      </Button>
    </form>
  )
}
