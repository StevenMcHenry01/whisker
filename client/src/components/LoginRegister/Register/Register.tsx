// 3rd party imports
import { useForm } from 'react-hook-form'
import React from 'react'
import { Button } from '@chakra-ui/core'
import { InputField } from '../InputField'

// My imports
import { validateUsername } from '../validators/username'
import { validateEmail } from '../validators/email'
import { validatePassword } from '../validators/password'
import { useRegisterMutation } from '../../../generated/graphql'

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = ({}) => {
  const { handleSubmit, errors, register: formRegister, formState } = useForm()
  const [register] = useRegisterMutation()

  const onSubmit = async (values: any) => {
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
      />

      <InputField
        errors={errors}
        validator={validateEmail}
        register={formRegister}
        fieldName='email'
      />

      <InputField
        errors={errors}
        validator={validatePassword}
        register={formRegister}
        fieldName='password'
        type='password'
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
