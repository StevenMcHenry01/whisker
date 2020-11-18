// 3rd party imports
import React from 'react'

// My imports
import { LoginForm } from '../components/forms/login/loginForm'
import { FormCard } from '../components/forms/shared/formCard'
import { MainLayout } from '../components/layout/main_layout/mainLayout'

const login: React.FC = ({ }) => {
  return (
    <MainLayout><FormCard header='Login'><LoginForm /></FormCard></MainLayout>
  )
}

export default login
