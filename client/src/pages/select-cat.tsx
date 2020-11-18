// 3rd party imports
import React from 'react'

// My imports
import { CatList } from '../components/choose_cat/chooseCatList'
import { MainLayout } from '../components/layout/main_layout/mainLayout'

const selectCat: React.FC = ({ }) => {
  return (
    <MainLayout>
      <CatList />
    </MainLayout>
  )
}

export default selectCat
