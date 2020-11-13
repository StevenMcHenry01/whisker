// 3rd party imports
import React from 'react'
import { SendResetEmailForm } from '../components/forms/SendResetEmailForm'
import { MainLayout } from '../components/wrappers/MainLayout'

// My imports

const SendResetEmail: React.FC = ({}) => {
  return (
    <MainLayout>
      <div>
        <SendResetEmailForm />
      </div>
    </MainLayout>
  )
}

export default SendResetEmail
