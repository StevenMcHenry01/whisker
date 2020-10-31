// 3rd party imports
import { Box } from '@chakra-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'

// My imports
import { ChangePasswordForm } from '../components/ChangePassword/ChangePasswordForm'

const ChangePassword: React.FC = ({}) => {
  const { token } = useParams<{ token: string }>()

  console.log(token)

  return (
    <Box
      m='100px auto'
      maxW='md'
      borderWidth='1px'
      rounded='lg'
      overflow='hidden'
      p='20px'
    >
      <ChangePasswordForm token={token} />
    </Box>
  )
}

export default ChangePassword
