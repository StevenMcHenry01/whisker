// 3rd party imports
import { useRouter } from 'next/router'
import React from 'react'
import { NewPasswordForm } from '../../components/forms/reset_password/newPasswordForm'
import { MainLayout } from '../../components/layout/main_layout/mainLayout'

// My imports
import withApollo from '../../config/apolloClient'

const NewPassword = () => {
  const router = useRouter()
  const token = typeof router.query.token === 'string' ? router.query.token : ''

  return (
    <MainLayout>
      <NewPasswordForm token={token} />
    </MainLayout>
  )
}

export default withApollo()(NewPassword)
