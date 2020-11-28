// 3rd party imports
import { useRouter } from 'next/router'
import React from 'react'

// My imports
import { CatList } from '../components/choose_cat/chooseCatList'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import Loading from '../components/utils/loading/loading'
import withApollo from '../config/apolloClient'
import { useGetUserCatsQuery } from '../generated/graphql'

const SelectCat = () => {
  const { data, loading, error } = useGetUserCatsQuery()
  const router = useRouter()

  if (error?.message === 'not authenticated') router.push('/login')

  return (
    <MainLayout>
      {loading ? <Loading /> : data && <CatList data={data} />}
    </MainLayout>
  )
}

export default withApollo()(SelectCat)
