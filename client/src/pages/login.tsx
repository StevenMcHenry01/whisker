// 3rd party imports
import React from 'react'

// My imports
import { LoginForm } from '../components/forms/login/loginForm'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const login = () => {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  )
}

export default withApollo()(login)
