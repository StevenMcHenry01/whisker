// 3rd party imports

// my imports
import withApollo from '../config/apolloClient'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { CatsPanel } from '../components/cats/catsPanel'
import React from 'react'
import { Upload } from '../components/upload/upload'

const Home = () => {
  const { data, loading, error } = useMeQuery({
    skip: isServer(),
  })
  return (
    <MainLayout>
      <Upload />
      {data && <CatsPanel me={data} />}
    </MainLayout>
  )
}

export default withApollo({ ssr: true })(Home)
