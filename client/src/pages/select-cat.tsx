// 3rd party imports
import React from 'react'

// My imports
import { CatList } from '../components/choose_cat/chooseCatList'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import withApollo from '../config/apolloClient'

const selectCat = () => {
  return (
    <MainLayout>
      <CatList />
    </MainLayout>
  )
}

export default withApollo()(selectCat)
