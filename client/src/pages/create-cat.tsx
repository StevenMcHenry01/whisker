// 3rd party imports
import React from 'react'
import { CreateCatForm } from '../components/forms/create_cat/createCatFrom'
import { MainLayout } from '../components/layout/main_layout/mainLayout'

// My imports
import withApollo from '../config/apolloClient'

const CreateCat = () => {
  return (
    <MainLayout>
      <h2>Create a new cat!</h2>
      <CreateCatForm />
    </MainLayout>
  )
}

export default withApollo()(CreateCat)
