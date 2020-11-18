// 3rd party imports
import React from 'react'

// My imports
import { RegisterForm } from '../components/forms/register/registerForm'
import { FormCard } from '../components/forms/shared/formCard'
import { MainLayout } from '../components/layout/main_layout/mainLayout'

const register: React.FC = ({ }) => {
  return (
    <MainLayout><FormCard header='Register'><RegisterForm /></FormCard></MainLayout>
  )
}

export default register
