// 3rd party imports
import React from 'react'

// my imports
import withApollo from '../config/apolloClient'
import { MainLayout } from '../components/layout/main_layout/mainLayout'
import { useMeQuery } from '../generated/graphql'
import { isServer } from '../utils/isServer'
import { CatsPanel } from '../components/cats/catsPanel'

const Home = () => {
  const { data } = useMeQuery({
    skip: isServer(),
  })
  return (
    <MainLayout>
      {data && <CatsPanel me={data} />}
    </MainLayout>
  )
}

export default withApollo({ ssr: true })(Home)
