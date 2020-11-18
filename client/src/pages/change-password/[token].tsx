// 3rd party imports
import { useRouter } from 'next/router'
import React from 'react'
import { FormCard } from '../../components/forms/FormCard'
import { NewPasswordForm } from '../../components/forms/NewPasswordForm'
import { MainLayout } from '../../components/wrappers/MainLayout'

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
