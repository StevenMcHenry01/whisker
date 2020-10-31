// 3rd party imports
import { Box } from '@chakra-ui/core'
import React from 'react'
import { SendResetEmailForm } from '../components/SendResetEmail/SendResetEmailForm'

// My imports

const SendResetEmail: React.FC = ({}) => {
  return (
    <Box
      m='100px auto'
      maxW='md'
      borderWidth='1px'
      rounded='lg'
      overflow='hidden'
      p='20px'
    >
      <SendResetEmailForm />
    </Box>
  )
}

export default SendResetEmail
