// 3rd party imports
import { Box } from '@chakra-ui/core'
import React from 'react'
import { SendResetEmailForm } from '../components/forms/SendResetEmailForm'
import { MainLayout } from '../components/wrappers/MainLayout'

// My imports

const SendResetEmail: React.FC = ({}) => {
  return (
    <MainLayout>
      <Box m="100px auto" maxW="md" borderWidth="1px" rounded="lg" overflow="hidden" p="20px">
        <SendResetEmailForm />
      </Box>
    </MainLayout>
  )
}

export default SendResetEmail
