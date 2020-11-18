// 3rd party imports
import React from 'react'

// My imports
import { SendResetEmailForm } from '../components/forms/reset_password/sendResetEmailForm'
import { MainLayout } from '../components/layout/main_layout/mainLayout'

const SendResetEmail: React.FC = ({ }) => {
  return (
    <MainLayout>
      <SendResetEmailForm />
    </MainLayout>
  )
}

export default SendResetEmail
