// 3rd party imports
import { Box } from '@chakra-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { NewPasswordForm } from '../../components/forms/NewPasswordForm'
import { MainLayout } from '../../components/wrappers/MainLayout'

// My imports

const NewPassword: React.FC = ({}) => {
  const router = useRouter()
  const token = typeof router.query.token === 'string' ? router.query.token : ''

  console.log(token)

  return (
    <MainLayout>
      <Box m="100px auto" maxW="md" borderWidth="1px" rounded="lg" overflow="hidden" p="20px">
        <NewPasswordForm token={token} />
      </Box>
    </MainLayout>
  )
}

export default NewPassword
