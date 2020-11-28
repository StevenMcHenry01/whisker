// 3rd party imports
import React from 'react'

// My imports
import { RegisterForm } from '../components/forms/register/registerForm'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const Register = () => {
  return (
    <MainLayout>
      <RegisterForm />
    </MainLayout>
  )
}

export default withApollo()(Register)
