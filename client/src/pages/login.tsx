// 3rd party imports
import React from 'react'

// My imports
import { LoginForm } from '../components/forms/login/loginForm'
import { FormCard } from '../components/forms/shared/formCard'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const login = ({ }) => {
  return (
    <MainLayout><FormCard header='Login'><LoginForm /></FormCard></MainLayout>
  )
}

export default withApollo()(login)
