// 3rd party imports
import { useRouter } from 'next/router'
import React from 'react'
import { FormCard } from '../../components/forms/shared/formCard'
import { NewPasswordForm } from '../../components/forms/reset_password/newPasswordForm'
import { MainLayout } from '../../components/layout/main_layout/mainLayout'

// My imports

const NewPassword: React.FC = ({ }) => {
  const router = useRouter()
  const token = typeof router.query.token === 'string' ? router.query.token : ''

  console.log(token)

  return (
    <MainLayout>
      <FormCard header="New Password">
        <NewPasswordForm token={token} />
      </FormCard>
    </MainLayout>
  )
}

export default NewPassword
