// 3rd party imports
import { Box, Button, Text, Link } from '@chakra-ui/core'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useForgotPasswordMutation } from '../../generated/graphql'
import { validateEmail } from '../../validators/email'
import { InputField } from './InputField'

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
      <Box>
        <Text fontSize="lg" textAlign="center">
          Email Sent!
        </Text>
        <Box textAlign="center" mt="5">
          <Link style={{ color: 'blue' }} href="/">
            Go home
          </Link>
        </Box>
      </Box>
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
      <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
        Change Password
      </Button>
    </form>
  )
}
