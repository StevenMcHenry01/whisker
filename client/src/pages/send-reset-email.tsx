// 3rd party imports
import React from 'react'

// My imports
import { SendResetEmailForm } from '../components/forms/reset_password/sendResetEmailForm'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const SendResetEmail = () => {
  return (
    <MainLayout>
      <SendResetEmailForm />
    </MainLayout>
  )
}

export default withApollo()(SendResetEmail)
