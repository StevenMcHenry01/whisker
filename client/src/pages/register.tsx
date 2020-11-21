// 3rd party imports
import React from 'react'

// My imports
import { RegisterForm } from '../components/forms/register/registerForm'
import { FormCard } from '../components/forms/shared/formCard'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const register = ({ }) => {
  return (
    <MainLayout><FormCard header='Register'><RegisterForm /></FormCard></MainLayout>
  )
}

export default withApollo()(register)
